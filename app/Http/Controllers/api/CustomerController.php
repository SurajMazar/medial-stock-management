<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerRequest;
use App\Http\Resources\CustomerCollection;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Repositories\Customers\CustomersInterface;
use Exception;

class CustomerController extends Controller
{
  private CustomersInterface $customerRepository;

  public function __construct(CustomersInterface $customerRepository)
  {
    $this->customerRepository = $customerRepository;
  }


  public function index(Request $request)
  {
    try {
      $Customers = $this->customerRepository->index($request);
      return new CustomerCollection($Customers);
    } catch (Exception $e) {
      return failure($e->getMessage());
    }
  }

  /**
   * Create Customer
   */
  public function store(CustomerRequest $request)
  {
    $response = $this->customerRepository->store($request);
    if ($response instanceof Customer) {
      return success('Customer created successfully', $response);
    }
    return failure($response->getMessage());
  }


  /**
   * Update Customer
   */
  public function update($id, CustomerRequest $request)
  {
    $response = $this->customerRepository->update($id, $request);
    if ($response instanceof Customer) {
      return success('Customer updated successfully', $response);
    }
    return failure($response->getMessage());
  }


  /**
   * Show Customer
   */
  public function show($id)
  {
    $Customer = Customer::findOrFail($id);
    if ($Customer instanceof Customer) {
      return success('', $Customer);
    }
    return failure($Customer->getMessage());
  }
}
Inline Parameters for VSCode