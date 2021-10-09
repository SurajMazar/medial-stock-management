<?php

  namespace App\Repositories\Products;

  use App\Models\Product;
  use Exception;
  use Illuminate\Support\Facades\DB;

class ProductRepository implements ProductInterface{
    

    public function index($request){
      $items_per_page = $request->items_per_page?:10;
      $keyword = $request->keyword;
      $products = Product::latest()->with('category','purchases');
      if($keyword){
        $products->Search($keyword);
      }
      return $products->paginate($items_per_page);
    }


    public function store($request){
      DB::beginTransaction();
      try{
        $input = $request->input();
        $product = Product::create($input);
        DB::commit();
        return $product;
      }catch(Exception $e){
        DB::rollBack();
        return $e;
      }
    }


    public function update($id,$request){
      DB::beginTransaction();
      try{
        $product = Product::findOrFail($id);
        $inputs = $request->all();
        $product->update($inputs);
        DB::commit();
        return $product;
      }catch(Exception $e){
        DB::rollBack();
        return $e;
      }
    }

    public function trash($id){
      $product  = Product::findOrFail($id);
      return $product->delete();
    }


    public function restore($id){
      $product  = Product::onlyTrashed();
      $product->findOrFail($id);
      return $product->restore();
    }


    public function delete($id){
      $product  = Product::latest();
      $product->findOrFail($id);
      return $product->forceDelete();
    }


  }


?>