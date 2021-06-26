<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\VendorRequest;
use App\Http\Resources\VendorCollection;
use App\Models\Vendor;
use App\Repositories\Vendors\VendorsRepositoryInterface;
use Exception;
use Illuminate\Http\Request;

class VendorController extends Controller
{
  private VendorsRepositoryInterface $vendorRepository;

  public function __construct(VendorsRepositoryInterface $vendorRepository){
    $this->vendorRepository = $vendorRepository;
  }

  /**
   * List vendors
   */
  public function index(Request $request){
    try{
      $vendors = $this->vendorRepository->index($request);
      return new VendorCollection($vendors);
    }catch(Exception $e){
      return failure($e->getMessage());
    }
  }

  /**
   * Create vendor
   */
  public function store(VendorRequest $request){
    try{
      $response = $this->vendorRepository->store($request);
      return success('Vendor created successfully',$response);
    }catch(Exception $e){
      return failure($e->getMessage());
    }
  }


  /**
   * Update vendor
  */
  public function update($id,VendorRequest $request){
    try{
      $response = $this->vendorRepository->update($id,$request);
        return success('Vendor updated successfully',$response);
    }catch(Exception $e){
      return failure($e->getMessage());
    }
  }


  /**
   * Show vendor
  */
  public function show(Vendor $vendor){
    return success("",$vendor);
  }

}
