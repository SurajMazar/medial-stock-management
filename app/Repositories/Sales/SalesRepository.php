<?php

  namespace App\Repositories\Sales;

use App\Models\Sale;
use App\Repositories\Sales\SalesInterface;
use Exception;
use Illuminate\Support\Facades\DB;

class SalesRepository implements SalesInterface{


  public function index($request){
    $items_per_page = $request->items_per_page?:10;
    $keyword = $request->keyword;
    $sales = Sale::latest()->with('purchase','saleInvoice');

    // search 
    if($keyword){
      $sales->Search($keyword);
    }

    // //filter by vendor
    // if($request->product_id){
    //   $sales->where('product_id',$request->product_id);
    // }

    return $sales->paginate($items_per_page);
  }


  public function store($request){
    DB::beginTransaction();
    try{
      $input = $request->all();
      $sale = Sale::create($input);
      DB::commit();
      $sale = Sale::with('purchase')->findOrFail($sale->id);
      return $sale;
    }catch(Exception $e){
      DB::rollBack();
      return $e;
    }
  }     
  
  public function update($id,$request){
    DB::beginTransaction();
    try{
      $sale = Sale::with('purchase')->findOrFail($id);
      $inputs = $request->all();
      $sale->update($inputs);
      DB::commit();
      return $sale;
    }catch(Exception $e){
      DB::rollBack();
      return $e;
    }
  }



  public function delete($id){
    $sale  = Sale::latest();
    $sale->findOrFail($id);
    return $sale->forceDelete();
  }

}