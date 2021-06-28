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
    $response = $this->vendorRepository->store($request);
    if($response instanceof Vendor){
      return success('Vendor created successfully',$response);
    }
    return failure($response->getMessage());
  }


  /**
   * Update vendor
  */
  public function update($id,VendorRequest $request){
    $response = $this->vendorRepository->update($id,$request);
    if($response instanceof Vendor){
      return success('Vendor updated successfully',$response);
    }
    return failure($response->getMessage());
  }


  /**
   * Show vendor
  */
  public function show(Vendor $vendor){
    return success("",$vendor);
  }

}
