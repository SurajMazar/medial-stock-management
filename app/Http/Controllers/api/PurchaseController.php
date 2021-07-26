<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PurchaseRequest;
use App\Models\Purchase;
use App\Repositories\Purchase\PurchaseInterface;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
  private PurchaseInterface $purchaseRepository;

	public function __construct(PurchaseInterface $purchaseRepository)
	{
		$this->purchaseRepository = $purchaseRepository;
	}


	 /**
   * Create pinvoice
   */
  public function store(PurchaseRequest $request){
    $response = $this->purchaseRepository->store($request);
    if($response instanceof Purchase){
      return success('Purchase Invoice created successfully',$response);
    }
    return failure($response->getMessage());
  }


  /**
   * Update pinvoice
  */
  public function update($id,PurchaseRequest $request){
    $response = $this->purchaseRepository->update($id,$request);
    if($response instanceof Purchase){
      return success('Purchase Invoice updated successfully',$response);
    }
    return failure($response->getMessage());
  }

  public function trash($id){
    return $this->purchaseRepository->trash($id);
  }
}

