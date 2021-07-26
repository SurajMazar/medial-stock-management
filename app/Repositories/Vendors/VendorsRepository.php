<?php

namespace App\Repositories\Vendors;

use App\Models\PurchaseInvoice;
use App\Models\Vendor;
use App\Repositories\Vendors\VendorsRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\DB;

class VendorsRepository implements VendorsRepositoryInterface{

    public function index($request){
      $items_per_page = $request->items_per_page?:10;
      $keyword = $request->keyword;
      $vendors = Vendor::latest();
      if($keyword){
        $vendors->Search($keyword);
      }
      return $vendors->paginate($items_per_page);
    }


    public function store($request){
      DB::beginTransaction();
      try{
        $input = $request->input();
        $vendor = Vendor::create($input);
        DB::commit();
        return $vendor;
      }catch(Exception $e){
        DB::rollBack();
        return $e;
      }
    }


    public function update($id,$request){
      DB::beginTransaction();
      try{
        $vendor = Vendor::findOrFail($id);
        $inputs = $request->all();
        $vendor->update($inputs);
        DB::commit();
        return $vendor;
      }catch(Exception $e){
        DB::rollBack();
        return $e;
      }
    }

    public function trash($id){
      $vendor  = Vendor::findOrFail($id);
      return $vendor->delete();
    }


    public function restore($id){
      $vendor  = Vendor::onlyTrashed();
      $vendor->findOrFail($id);
      return $vendor->restore();
    }


    public function delete($id){
      $vendor  = Vendor::onlyTrashed();
      $vendor->findOrFail($id);
      return $vendor->forceDelete();
    }


    public function show($id)
    {
      $vendor = Vendor::findOrFail($id);
      $vendor->total_purchases = $this->getTotalPurchases($id);
      return $vendor;
    }


    public function getTotalPurchases($vendor_id){
      $purchases = PurchaseInvoice::where('vendor_id',$vendor_id)->get();
      $total = 0;
      foreach($purchases as $purchase){
        $total = $total + $purchase->total;
      };
      return $total;
    }




  }

?>