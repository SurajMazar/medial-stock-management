<?php

  namespace App\Repositories\PurchaseInvoice;

  use App\Models\PurchaseInvoice;
  use Exception;
  use Illuminate\Support\Facades\DB;

class PurchaseInvoiceRepository implements PurchaseInvoiceInterface{
    

    public function index($request){
      $items_per_page = $request->items_per_page?:10;
      $keyword = $request->keyword;
      $purchaseInvoices = PurchaseInvoice::latest()->with('vendor','currency');
      if($keyword){
        $purchaseInvoices->Search($keyword);
      }
      return $purchaseInvoices->paginate($items_per_page);
    }


    public function store($request){
      DB::beginTransaction();
      try{
        $input = $request->input();
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
        $purchaseInvoice = PurchaseInvoice::findOrFail($id);
        $inputs = $request->all();
        $purchaseInvoice->update($inputs);
        DB::commit();
        return $purchaseInvoice;
      }catch(Exception $e){
        DB::rollBack();
        return $e;
      }
    }

    public function trash($id){
      $purchaseInvoice  = PurchaseInvoice::findOrFail($id);
      return $purchaseInvoice->delete();
    }


    public function restore($id){
      $purchaseInvoice  = PurchaseInvoice::onlyTrashed();
      $purchaseInvoice->findOrFail($id);
      return $purchaseInvoice->restore();
    }


    public function delete($id){
      $purchaseInvoice  = PurchaseInvoice::onlyTrashed();
      $purchaseInvoice->findOrFail($id);
      return $purchaseInvoice->forceDelete();
    }


  }


?>