<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentRequest;
use App\Http\Resources\PaymentCollection;
use App\Models\Payment;
use App\Repositories\Payments\PaymentsInterface;
use Exception;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
  private PaymentsInterface $paymentRepository;

  public function __construct(PaymentsInterface $paymentRepository)
  {
    $this->paymentRepository = $paymentRepository;
  }


  public function index(Request $request){
    try{
      $payments = $this->paymentRepository->index($request);
      return new PaymentCollection($payments);
    }catch(Exception $e){
      return failure($e->getMessage());
    }
  }

  public function store(PaymentRequest $request){
    $response = $this->paymentRepository->store($request);
    if($response instanceof Payment){
      return success('Payment created!',$response);
    }
    return failure($response->getMessage());
  }

  public function update($id,PaymentRequest $request){
    $response = $this->paymentRepository->update($id,$request);
    if($response instanceof Payment){
      return success('Payment updated!',$response);
    }
    return failure($response->getMessage());
  }

  public function destroy($id){
    return $this->paymentRepository->delete($id);
  }
}
