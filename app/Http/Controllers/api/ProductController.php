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
  private ProductInterface $productInterface;

  public function __construct(ProductInterface $productInterface){
    $this->productInterface = $productInterface;
  }

  /**
   * List vendors
   */
  public function index(Request $request){
    try{
      $vendors = $this->productInterface->index($request);
      return new ProductCollection($vendors);
    }catch(Exception $e){
      return failure($e->getMessage());
    }
  }

  /**
   * Create vendor
   */
  public function store(ProductRequest $request){
    $response = $this->productInterface->store($request);
    if($response instanceof Product){
      return success('Product created successfully',$response);
    }
    return failure($response->getMessage());
  }


  /**
   * Update vendor
  */
  public function update($id,ProductRequest $request){
    $response = $this->productInterface->update($id,$request);
    if($response instanceof Product){
      return success('Product updated successfully',$response);
    }
    return failure($response->getMessage());
  }


  /**
   * Show vendor
  */
  public function show($id){
    $pc = Product::with('category')->findOrFail($id);
    if($pc instanceof Product){
      return success('',$pc);
    }
    return failure($pc->getMessage());
  }
}
