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
  private CurrencyInterface $currencyRepository;

  public function __construct(CurrencyInterface $currencyRepository)
  {
    $this->currencyRepository = $currencyRepository;
  }

  /**
   * List currency
   */
  public function index(Request $request)
  {
    try {
      $currencies = $this->currencyRepository->index($request);
      return new CurrencyCollection($currencies);
    } catch (Exception $e) {
      return failure($e->getMessage());
    }
  }

  /**
   * Create currency
   */
  public function store(CurrencyRequest $request)
  {
    $response = $this->currencyRepository->store($request);
    if ($response instanceof Currency) {
      return success('Currency created successfully', $response);
    }
    return failure($response->getMessage());
  }


  /**
   * Update currency
   */
  public function update($id, CurrencyRequest $request)
  {
    $response = $this->currencyRepository->update($id, $request);
    if ($response instanceof Currency) {
      return success('Currency updated successfully', $response);
    }
    return failure($response->getMessage());
  }


  /**
   * Show currency
   */
  public function show($id)
  {
    $currency = Currency::findOrFail($id);
    if ($currency instanceof Currency) {
      return success('', $currency);
    }
    return failure($currency->getMessage());
  }
}
