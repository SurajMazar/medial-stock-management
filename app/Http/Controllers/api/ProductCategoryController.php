<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductCategoryRequest;
use App\Http\Resources\ProductCategoryCollection;
use App\Models\ProductCategory;
use App\Repositories\ProductCategory\ProductCategoryInterface;
use Exception;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
  private ProductCategoryInterface $productCategoryInterface;

  public function __construct(ProductCategoryInterface $productCategoryInterface){
    $this->productCategoryInterface = $productCategoryInterface;
  }

  /**
   * List vendors
   */
  public function index(Request $request){
    try{
      $vendors = $this->productCategoryInterface->index($request);
      return new ProductCategoryCollection($vendors);
    }catch(Exception $e){
      return failure($e->getMessage());
    }
  }

  /**
   * Create vendor
   */
  public function store(ProductCategoryRequest $request){
    $response = $this->productCategoryInterface->store($request);
    if($response instanceof ProductCategory){
      return success('Product category created successfully',$response);
    }
    return failure($response->getMessage());
  }


  /**
   * Update vendor
  */
  public function update($id,ProductCategoryRequest $request){
    $response = $this->productCategoryInterface->update($id,$request);
    if($response instanceof ProductCategory){
      return success('Product category updated successfully',$response);
    }
    return failure($response->getMessage());
  }


  /**
   * Show vendor
  */
  public function show($id){
    $pc = ProductCategory::findOrFail($id);
    if($pc instanceof ProductCategory){
      return success('',$pc);
    }
    return failure($pc->getMessage());
  }

}
