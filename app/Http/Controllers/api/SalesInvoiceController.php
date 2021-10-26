<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SalesInvoiceRequest;
use App\Http\Resources\SaleInvoiceCollection;
use App\Models\SalesInvoice;
use App\Repositories\SaleInvoice\SaleInvoiceRepository;
use Exception;
use Illuminate\Http\Request;

class SalesInvoiceController extends Controller
{
    private SaleInvoiceRepository $salesInvoiceRepository;

  public function __construct(SaleInvoiceRepository $salesInvoiceRepository)
  {
    $this->salesInvoiceRepository = $salesInvoiceRepository;
  }


/**
   * List pinvoice
   */
  public function index(Request $request){
    try{
      $pinvoices = $this->salesInvoiceRepository->index($request);
      return new SaleInvoiceCollection($pinvoices);
    }catch(Exception $e){
      return failure($e->getMessage());
    }
  }

  /**
   * Create pinvoice
  */
  public function store(SalesInvoiceRequest $request){
    $response = $this->salesInvoiceRepository->store($request);
    if($response instanceof SalesInvoice){
      return success('Purchase Invoice created successfully',$response);
    }
    return failure($response->getMessage());
  }


  /**
   * Update pinvoice
  */
  public function update($id,SalesInvoiceRequest $request){
    $response = $this->salesInvoiceRepository->update($id,$request);
    if($response instanceof SalesInvoice){
      return success('Purchase Invoice updated successfully',$response);
    }
    return failure($response->getMessage());
  }


  /**
   * Show pinvoice
  */
  public function show($id){
    $pc = SalesInvoice::with('customer','sales')->findOrFail($id);
    if($pc instanceof SalesInvoice){
      return success('',$pc);
    }
    return failure($pc->getMessage());
  }

  
  /**
   * download pdf
   */
  public function export_pdf($id){
    return $this->salesInvoiceRepository->downloadPdf($id);
  }


  public function destroy($id){
    return $this->salesInvoiceRepository->delete($id);
  }
}
