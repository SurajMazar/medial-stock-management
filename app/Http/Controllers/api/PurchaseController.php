<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PurchaseRequest;
use App\Http\Resources\PurchaseCollection;
use App\Models\Purchase;
use App\Repositories\Purchase\PurchaseInterface;
use Exception;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
  private PurchaseInterface $purchaseRepository;

	public function __construct(PurchaseInterface $purchaseRepository)
	{
		$this->purchaseRepository = $purchaseRepository;
	}

  /**
   * get purchases
   */
  public function index(Request $request){
    try{
      $response = $this->purchaseRepository->index($request);
      return new PurchaseCollection($response);
    }catch(Exception $e){
      return failure($e->getMessage());
    }
  }


	 /**
   * Create pinvoice
   */
  public function store(PurchaseRequest $request){
    $response = $this->purchaseRepository->store($request);
    if($response instanceof Purchase){
      return success('Purchase created successfully',$response);
    }
    return failure($response->getMessage());
  }


  /**
   * Update pinvoice
  */
  public function update($id,PurchaseRequest $request){
    $response = $this->purchaseRepository->update($id,$request);
    if($response instanceof Purchase){
      return success('Purchase  updated successfully',$response);
    }
    return failure($response->getMessage());
  }

  public function destroy($id){
    return $this->purchaseRepository->delete($id);
  }
}

