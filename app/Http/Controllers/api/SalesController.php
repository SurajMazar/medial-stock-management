<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SalesRequest;
use App\Http\Resources\SalesCollection;
use App\Models\Sale;
use App\Repositories\Sales\SalesInterface;
use Exception;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    private SalesInterface $saleRepository;

	public function __construct(SalesInterface $saleRepository)
	{
		$this->saleRepository = $saleRepository;
	}

  /**
   * get purchases
   */
  public function index(Request $request){
    try{
      $response = $this->saleRepository->index($request);
      return new SalesCollection($response);
    }catch(Exception $e){
      return failure($e->getMessage());
    }
  }


	 /**
   * Create pinvoice
   */
  public function store(SalesRequest $request){
    $response = $this->saleRepository->store($request);
    if($response instanceof Sale){
      return success('Purchase created successfully',$response);
    }
    return failure($response->getMessage());
  }


  /**
   * Update pinvoice
  */
  public function update($id,SalesRequest $request){
    $response = $this->saleRepository->update($id,$request);
    if($response instanceof Sale){
      return success('Purchase  updated successfully',$response);
    }
    return failure($response->getMessage());
  }

  public function destroy($id){
    return $this->saleRepository->delete($id);
  }
}
