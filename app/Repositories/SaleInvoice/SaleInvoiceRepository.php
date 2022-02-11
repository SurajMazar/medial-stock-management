<?php

  namespace App\Repositories\SaleInvoice;

  use App\Models\SalesInvoice;
  use App\Repositories\SaleInvoice\SaleInvoiceInterface;
  use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
  use PDF;

class SaleInvoiceRepository implements SaleInvoiceInterface{
    

    public function index($request){
      $items_per_page = $request->items_per_page?:10;
      $keyword = $request->keyword;
      $salesInvoices = SalesInvoice::latest()->with('customer','sales');

      // search 
      if($keyword){
        $salesInvoices->Search($keyword);
      }

      //filter by vendor
      if($request->customer){
        $salesInvoices->where('customer_id',$request->customer);
      }

      //date range
      if($request->from && $request->to){
        $from = date($request->from);
        $to = date($request->to);
        $salesInvoices->WhereBetween('transaction_date', [$from, $to]);
      }
    
      return $salesInvoices->paginate($items_per_page);
    }


    public function store($request){
      DB::beginTransaction();
      try{

        $request->merge([
          'transaction_date' => date('Y-m-d H:i:s',strtotime($request->transaction_date)),
        ]);
        $input = $request->all();
        $input['invoice_number'] = sprintf('SI-%s',uniqid());
        $input['user_id'] =  Auth::user()->id;
        $saleInvoice = SalesInvoice::create($input);
        DB::commit();

        return $saleInvoice;
      }catch(Exception $e){
        DB::rollBack();
        return $e;
      }
    }


    public function update($id,$request){
      DB::beginTransaction();
      try{
        $saleInvoice = SalesInvoice::with('customer')->findOrFail($id);
        $request->merge([
          'transaction_date' => date('Y-m-d H:i:s',strtotime($request->transaction_date)),
          'customer_id'=>$request->customer_id?:null,
          'customer_name'=>$request->customer_name?:null
        ]);
        $inputs = $request->all();
        $saleInvoice->update($inputs);
        DB::commit();
        return $saleInvoice;
      }catch(Exception $e){
        DB::rollBack();
        return $e;
      }
    }

    public function delete($id){
      return SalesInvoice::withTrashed()->find($id)->forceDelete();
    }

    public function downloadPdf($id){
      $data = SalesInvoice::with('sales','customer');
      $data = $data->findOrFail($id);
      $data->alterations= str_replace("\\", "",$data->alterations);
      $data->alterations= json_decode($data->alterations);
      $pdf = PDF::loadView('pdf.sales_invoice',compact('data'));
      return $pdf->download('sales-invoice.pdf');
    }


  }


?>
