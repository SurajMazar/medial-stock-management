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
  private ProductCategoryInterface $productCategoryRepository;

  public function __construct(ProductCategoryInterface $productCategoryRepository){
    $this->productCategoryRepository = $productCategoryRepository;
  }

  /**
   * List vendors
   */
  public function index(Request $request){
    try{
      $vendors = $this->productCategoryRepository->index($request);
      return new ProductCategoryCollection($vendors);
    }catch(Exception $e){
      return failure($e->getMessage());
    }
  }

  /**
   * Create vendor
   */
  public function store(ProductCategoryRequest $request){
    $response = $this->productCategoryRepository->store($request);
    if($response instanceof ProductCategory){
      return success('Product category created successfully',$response);
    }
    return failure($response->getMessage());
  }


  /**
   * Update vendor
  */
  public function update($id,ProductCategoryRequest $request){
    $response = $this->productCategoryRepository->update($id,$request);
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
