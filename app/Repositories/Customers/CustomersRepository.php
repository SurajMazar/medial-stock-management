<?php

  namespace App\Repositories\Customers;

use App\Models\Customer;
use Exception;
use Illuminate\Support\Facades\DB;

class CustomersRepository implements CustomersInterface{
    

    public function index($request){
      $items_per_page = $request->items_per_page?:10;
      $keyword = $request->keyword;
      $customers = Customer::latest();
      if($keyword){
        $customers->Search($keyword);
      }
      return $customers->paginate($items_per_page);
    }


    public function store($request){
      DB::beginTransaction();
      try{
        $input = $request->input();
        $customer = Customer::create($input);
        DB::commit();
        return $customer;
      }catch(Exception $e){
        DB::rollBack();
        return $e;
      }
    }


    public function update($id,$request){
      DB::beginTransaction();
      try{
        $customer = Customer::findOrFail($id);
        $inputs = $request->all();
        $customer->update($inputs);
        DB::commit();
        return $customer;
      }catch(Exception $e){
        DB::rollBack();
        return $e;
      }
    }

    public function trash($id){
      $customer  = Customer::findOrFail($id);
      return $customer->delete();
    }


    public function restore($id){
      $customer  = Customer::onlyTrashed();
      $customer->findOrFail($id);
      return $customer->restore();
    }


    public function delete($id){
      $customer  = Customer::latest();
      $customer->findOrFail($id);
      return $customer->forceDelete();
    }


  }


?>