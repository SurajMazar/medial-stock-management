<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\VendorRequest;
use App\Models\Vendor;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VendorController extends Controller
{
  public function index(){
    return Vendor::latest()->paginate(15);
  }

  public function store(VendorRequest $request){
    DB::beginTransaction();
    try{
      $vendor = Vendor::create([
        'name'=>$request->name,
        'email'=>$request->email,
        'phone_number'=>$request->phone_number,
        'mobile_number'=>$request->mobile_number,
        'pan_vat_number'=>$request->pan_vat_number,
        'contact_person'=>$request->contact_person,
        'contact_person_number'=>$request->contact_person_number,
        'location'=>$request->location,
        'description'=>$request->description,
      ]);


      DB::commit();
      return $vendor;
    }catch(Exception $e){
      DB::rollBack();
      return $e;
    }
  }


  public function show($id){
    $vendor = Vendor::latest();
    $vendor->findOrFail($id);
    return $vendor;
  }


  public function update(VendorRequest $request, $id){
    $vendor = Vendor::findOrFail($id);
    
    DB::beginTransaction();
    try{

      $vendor->update([
        'name'=>$request->name,
        'email'=>$request->email,
        'phone_number'=>$request->phone_number,
        'mobile_number'=>$request->mobile_number,
        'pan_vat_number'=>$request->pan_vat_number,
        'contact_person'=>$request->contact_person,
        'contact_person_number'=>$request->contact_person_number,
        'location'=>$request->location,
        'description'=>$request->description,
      ]);

      DB::commit();

      return $vendor;
      
    }catch(Exception $e){
      DB::rollBack();
      return $e;
    }
    
  }


  public function trash($id){
    $vendor = Vendor::findOrFail($id);
    return $vendor->delete();
  }


  public function restore($id){
    $vendor = Vendor::onlyTrashed();
    return $vendor->findOrFail($id)->restore();
  }


  public function trashed(){
    return Vendor::onlyTrashed()->paginate(10);
  }

  public function delete($id){
    $vendor = Vendor::onlyTrashed();
    return $vendor->findOrFail($id)->forceDelete();
  }

  public function search(Request $request){
    return Vendor::search($request)->paginate(15);
  }

}
