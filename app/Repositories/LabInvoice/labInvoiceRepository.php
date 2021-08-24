<?php

namespace App\Repositories\LabInvoice;

use App\Models\LabInvoice;
use Exception;
use Illuminate\Support\Facades\DB;

class LabInvoiceRepository implements LabInvoiceInterface{


  /**
   * @tutorial get labinvoices
   * @params Request $request
   * @return JSON
   */
  public function index($request){
    $items_per_page = $request->items_per_page?:10;
    $keyword = $request->keyword?:null;
    $labInvoices = LabInvoice::orderBy('invoice_date','desc');

    if($keyword){
      $labInvoices->Search($keyword);
    }

     //date range
     if($request->from && $request->to){
      $from = date($request->from);
      $to = date($request->to);
      $labInvoices->WhereBetween('invoice_date', [$from, $to]);
    }

    return $labInvoices->paginate($items_per_page);

  }

  /**
   * @tutorial CREATE lab invoice
   * @params Request $request
   * @return JSON
   */
  public function store($request){
    DB::beginTransaction();
    try{
      $request->merge([
        'invoice_date' => date('Y-m-d H:i:s',strtotime($request->invoice_date)),
      ]);
      $input = $request->all();
      $labInvoice = LabInvoice::create($input);
      DB::commit();
      return $labInvoice;
    }catch(Exception $e){
      DB::rollBack();
      return $e;
    }
  }


  /**
   * @tutorial update lab invoice
   * @params Int $id Request $request
   * @return JSON
   */
  public function update($id,$request){
    DB::beginTransaction();
    try{
      $labInvoice = LabInvoice::findOrFail($id);
      $request->merge([
        'invoice_date' => date('Y-m-d H:i:s',strtotime($request->invoice_date)),
      ]);
      $inputs = $request->all();
      $labInvoice->update($inputs);
      DB::commit();
      return $labInvoice;
    }catch(Exception $e){
      DB::rollBack();
      return $e;
    }
  }


  /**
   * @tutorial DELETE LAB INVOICE
   * @params Request $request
   * @return JSON
   */
  public function delete($id){
    return LabInvoice::withTrashed()->find($id)->forceDelete();
  }


}

?>