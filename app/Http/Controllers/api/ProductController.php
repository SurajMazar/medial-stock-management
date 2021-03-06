<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductCollection;
use App\Models\Product;
use App\Repositories\Products\ProductInterface;
use Exception;
use Illuminate\Http\Request;

class ProductController extends Controller
{
  private ProductInterface $productRepository;

  public function __construct(ProductInterface $productRepository){
    $this->productRepository = $productRepository;
  }

  /**
   * List vendors
   */
  public function index(Request $request){
    try{
      $vendors = $this->productRepository->index($request);
      return new ProductCollection($vendors);
    }catch(Exception $e){
      return failure($e->getMessage());
    }
  }

  /**
   * Create product
   */
  public function store(ProductRequest $request){
    $response = $this->productRepository->store($request);
    if($response instanceof Product){
      return success('Product created successfully',$response);
    }
    return failure($response->getMessage());
  }


  /**
   * Update product
  */
  public function update($id,ProductRequest $request){
    $response = $this->productRepository->update($id,$request);
    if($response instanceof Product){
      return success('Product updated successfully',$response);
    }
    return failure($response->getMessage());
  }


  /**
   * Show product
  */
  public function show($id){
    $pc = Product::with('category','purchases')->findOrFail($id);
    
    $total_purchases = 0;
    $total_stocks = 0;

    foreach($pc->purchases as $purchase){
      $total_purchases = $total_purchases + $purchase->amount;
      $total_stocks = $total_stocks + $purchase->quantity;
    }

    $pc->total_purchases = $total_purchases;
    $pc->total_stocks = $total_stocks;
    
    if($pc instanceof Product){
      return success('',$pc);
    }
    return failure($pc->getMessage());
  }
}
