<?php

namespace App\Repositories\LabInvoice;

use App\Models\LabInvoice;
use PDF;
use Exception;
use Illuminate\Support\Facades\Auth;
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
    $labInvoices = LabInvoice::orderBy('invoice_date','desc')->with('customer');

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
      $input['invoice_number'] = sprintf('LR-%s',uniqid());
      $input['user_id'] =  Auth::user()->id;
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
    $labInvoice =  LabInvoice::findOrFail($id);
    return $labInvoice->delete();
  }



public function downloadInvoicePdf($id){
      $data = LabInvoice::latest();
      $data = $data->findOrFail($id);
      $data->tests= str_replace("\\", "",$data->tests);
      $data->tests= json_decode($data->tests);
      $data->alterations= str_replace("\\", "",$data->alterations);
      $data->alterations= json_decode($data->alterations);
      $pdf = PDF::loadView('pdf.lab_invoice',compact('data'));
      return $pdf->download('lab-invoice.pdf');
    }

  public function downloadReportPdf($id){
      $data = LabInvoice::latest();
      $data = $data->findOrFail($id);
      $data->tests= str_replace("\\", "",$data->tests);
      $data->tests= json_decode($data->tests);
      $data->alterations= str_replace("\\", "",$data->alterations);
      $data->alterations= json_decode($data->alterations);
      $pdf = PDF::loadView('pdf.lab_report',compact('data'));
      return $pdf->download('lab-invoice.pdf');
    }

}

?>
