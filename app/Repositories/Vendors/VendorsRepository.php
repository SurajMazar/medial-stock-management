<?php

namespace App\Repositories\Vendors;

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
        $vendor = Vendor::finOrFail($id);
        $inputs = $request->input();
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

  }

?>