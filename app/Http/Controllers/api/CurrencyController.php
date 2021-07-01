<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CurrencyRequest;
use App\Http\Resources\CurrencyCollection;
use App\Models\Currency;
use App\Repositories\Currency\CurrencyInterface;
use Exception;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
  private CurrencyInterface $currencyInterface;

  public function __construct(CurrencyInterface $currencyInterface)
  {
    $this->currencyInterface = $currencyInterface;
  }

  /**
   * List currency
   */
  public function index(Request $request)
  {
    try {
      $vendors = $this->currencyInterface->index($request);
      return new CurrencyCollection($vendors);
    } catch (Exception $e) {
      return failure($e->getMessage());
    }
  }

  /**
   * Create currency
   */
  public function store(CurrencyRequest $request)
  {
    $response = $this->currencyInterface->store($request);
    if ($response instanceof Currency) {
      return success('Product category created successfully', $response);
    }
    return failure($response->getMessage());
  }


  /**
   * Update currency
   */
  public function update($id, CurrencyRequest $request)
  {
    $response = $this->currencyInterface->update($id, $request);
    if ($response instanceof Currency) {
      return success('Product category updated successfully', $response);
    }
    return failure($response->getMessage());
  }


  /**
   * Show currency
   */
  public function show($id)
  {
    $pc = Currency::findOrFail($id);
    if ($pc instanceof Currency) {
      return success('', $pc);
    }
    return failure($pc->getMessage());
  }
}
