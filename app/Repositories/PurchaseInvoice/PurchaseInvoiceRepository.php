<?php

  namespace App\Repositories\PurchaseInvoice;

  use App\Models\PurchaseInvoice;
  use Exception;
  use Illuminate\Support\Facades\DB;
  use PDF;
class PurchaseInvoiceRepository implements PurchaseInvoiceInterface{
    

    public function index($request){
      $items_per_page = $request->items_per_page?:10;
      $keyword = $request->keyword;
      $purchaseInvoices = PurchaseInvoice::latest()->with('vendor','currency','purchases');

      // search 
      if($keyword){
        $purchaseInvoices->Search($keyword);
      }

      //filter by vendor
      if($request->vendor){
        $purchaseInvoices->where('vendor_id',$request->vendor);
      }

      //date range
      if($request->from && $request->to){
        $from = date($request->from);
        $to = date($request->to);
        $purchaseInvoices->WhereBetween('transaction_date', [$from, $to]);
      }
    
      return $purchaseInvoices->paginate($items_per_page);
    }


    public function store($request){
      DB::beginTransaction();
      try{

        $request->merge([
          'transaction_date' => date('Y-m-d H:i:s',strtotime($request->transaction_date)),
          'invoice_issue_date' => date('Y-m-d H:i:s',strtotime($request->invoice_issue_date)),
        ]);

        $input = $request->all();

        $purchaseInvoice = PurchaseInvoice::create($input);
        DB::commit();
        return $purchaseInvoice;
      }catch(Exception $e){
        DB::rollBack();
        return $e;
      }
    }


    public function update($id,$request){
      DB::beginTransaction();
      try{
        $purchaseInvoice = PurchaseInvoice::with('vendor')->findOrFail($id);
        $request->merge([
          'transaction_date' => date('Y-m-d H:i:s',strtotime($request->transaction_date)),
          'invoice_issue_date' => date('Y-m-d H:i:s',strtotime($request->invoice_issue_date)),
          'currency_id'=>$request->currency_id?:null
        ]);
        $inputs = $request->all();
        $purchaseInvoice->update($inputs);
        DB::commit();
        return $purchaseInvoice;
      }catch(Exception $e){
        DB::rollBack();
        return $e;
      }
    }

    public function delete($id){
      return PurchaseInvoice::latest()->find($id)->forceDelete();
    }

    public function downloadPdf($id){
      $data = PurchaseInvoice::with('vendor','purchases');
      $data = $data->findOrFail($id);
      $data->alterations= str_replace("\\", "",$data->alterations);
      $data->alterations= json_decode($data->alterations);
      $pdf = PDF::loadView('pdf.purchase_invoice',compact('data'));
      return $pdf->download('purchase-invoice.pdf');
    }


  }


?>