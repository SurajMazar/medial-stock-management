<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PurchaseInvoiceRequest;
use App\Http\Resources\PurchaseInvoiceCollection;
use App\Models\PurchaseInvoice;
use App\Repositories\PurchaseInvoice\PurchaseInvoiceInterface;
use Exception;
use Illuminate\Http\Request;

class PurchaseInvoiceController extends Controller
{
  private PurchaseInvoiceInterface $purchaseInvoiceRepository;

  public function __construct(PurchaseInvoiceInterface $purchaseInvoiceRepository)
  {
    $this->purchaseInvoiceRepository = $purchaseInvoiceRepository;
  }


/**
   * List pinvoice
   */
  public function index(Request $request){
    try{
      $pinvoices = $this->purchaseInvoiceRepository->index($request);
      return new PurchaseInvoiceCollection($pinvoices);
    }catch(Exception $e){
      return failure($e->getMessage());
    }
  }

  /**
   * Create pinvoice
   */
  public function store(PurchaseInvoiceRequest $request){
    $response = $this->purchaseInvoiceRepository->store($request);
    if($response instanceof PurchaseInvoice){
      return success('Purchase Invoice created successfully',$response);
    }
    return failure($response->getMessage());
  }


  /**
   * Update pinvoice
  */
  public function update($id,PurchaseInvoiceRequest $request){
    $response = $this->purchaseInvoiceRepository->update($id,$request);
    if($response instanceof PurchaseInvoice){
      return success('Purchase Invoice updated successfully',$response);
    }
    return failure($response->getMessage());
  }


  /**
   * Show pinvoice
  */
  public function show($id){
    $pc = PurchaseInvoice::with('vendor','currency')->findOrFail($id);
    if($pc instanceof PurchaseInvoice){
      return success('',$pc);
    }
    return failure($pc->getMessage());
  }

}