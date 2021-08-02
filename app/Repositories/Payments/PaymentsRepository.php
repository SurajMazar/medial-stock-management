<?php
  namespace App\Repositories\Payments;

use App\Models\Payment;
use Exception;
use Illuminate\Support\Facades\DB;

class PaymentsRepository implements PaymentsInterface{

    public function index($request){
      $items_per_page = $request->items_per_page?:10;
      $keyword = $request->keyword;
      $vendor = $request->vendor_id;
      $payments = Payment::latest();

      if($vendor){
        $payments = $payments->where('vendor_id',$vendor);
      }

      if($keyword){
        $payments->Search($keyword);
      }
       //date range
       if($request->from && $request->to){
        $from = date($request->from);
        $to = date($request->to);
        $payments->WhereBetween('payment_date', [$from, $to]);
      }
    
      return $payments->paginate($items_per_page);
    }


    public function store($request){
      DB::beginTransaction();
      try{
        $request->merge([
          'payment_date' => date('Y-m-d H:i:s',strtotime($request->payment_date)),
        ]);
        $input = $request->input();
        $payment = Payment::create($input);
        DB::commit();
        $payment = Payment::with('vendor')->findOrFail($payment->id);
        return $payment;
      }catch(Exception $e){
        DB::rollBack();
        return $e;
      }
    }


    public function update($id,$request){
      DB::beginTransaction();
      try{
        $payment = Payment::with('vendor')->findOrFail($id);
        $request->merge([
          'payment_date' => date('Y-m-d H:i:s',strtotime($request->payment_date)),
        ]);
        $inputs = $request->all();
        $payment->update($inputs);
        DB::commit();
        return $payment;
      }catch(Exception $e){
        DB::rollBack();
        return $e;
      }
    }


  }
?>