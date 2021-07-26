<?php

  namespace App\Repositories\Purchase;

use App\Models\Purchase;
use Exception;
use Illuminate\Support\Facades\DB;

class PurchaseRepository implements PurchaseInterface{

  public function store($request){
    DB::beginTransaction();
    try{
      $request->merge([
        'expiry_date' => date('Y-m-d H:i:s',strtotime($request->expiry_date)),
      ]);
      $input = $request->all();
      $purchase = Purchase::create($input);
      DB::commit();
      $purchase = Purchase::with('product')->findOrFail($purchase->id);
      return $purchase;
    }catch(Exception $e){
      DB::rollBack();
      return $e;
    }
  }     
  
  public function update($id,$request){
    DB::beginTransaction();
    try{
      $purchase = Purchase::with('product')->findOrFail($id);
      $request->merge([
        'expiry_date' => date('Y-m-d H:i:s',strtotime($request->expiry_date)),
      ]);
      $inputs = $request->all();
      $purchase->update($inputs);
      DB::commit();
      return $purchase;
    }catch(Exception $e){
      DB::rollBack();
      return $e;
    }
  }

  public function trash($id){
    $purchase  = Purchase::findOrFail($id);
    return $purchase->forceDelete();
  }


  public function restore($id){
    $purchase  = Purchase::onlyTrashed();
    $purchase->findOrFail($id);
    return $purchase->restore();
  }


  public function delete($id){
    $purchase  = Purchase::onlyTrashed();
    $purchase->findOrFail($id);
    return $purchase->forceDelete();
  }

}