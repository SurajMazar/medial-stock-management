<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LabInvoiceRequest;
use App\Http\Resources\LabInvoiceCollection;
use App\Models\LabInvoice;
use App\Repositories\LabInvoice\LabInvoiceInterface;
use Exception;
use Illuminate\Http\Request;

class LabInvoiceController extends Controller
{
  /**@var */
  protected $labInvoiceRepository;

  
  /** @constructor */
  public function __construct(LabInvoiceInterface $labInvoiceRepository){
    $this->labInvoiceRepository = $labInvoiceRepository;
  }


  /**
   * @params $request
   * @return JSON
   */
  public function index(Request $request){
    try{
      $labInvoices = $this->labInvoiceRepository->index($request);
      return new LabInvoiceCollection($labInvoices);
    }catch(Exception $e){
      return failure($e->getMessage());
    }
  }



  /**
   * @params $request
   * @return JSON
   */
  public function store(LabInvoiceRequest $request){
    $response = $this->labInvoiceRepository->store($request);
    if($response instanceof LabInvoice){
      return success('Lab invoice created successfully',$response);
    }
    return failure($response->getMessage());
  }



  /**
   * @params $id $request
   * @return JSON
   */
  public function update($id,LabInvoiceRequest $request){
    $response = $this->labInvoiceRepository->update($id,$request);
    if($response instanceof LabInvoice){
      return success('Lab invoice created successfully',$response);
    }
    return failure($response->getMessage());
  }


  /**
   * @params $id
   * @return boolean
   */
  public function destroy($id){
    return $this->labInvoiceRepository->delete($id);
  }

}
