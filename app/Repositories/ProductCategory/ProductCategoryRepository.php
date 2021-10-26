<?php

  namespace App\Repositories\ProductCategory;

use App\Models\ProductCategory;
use Exception;
use Illuminate\Support\Facades\DB;

class ProductCategoryRepository implements ProductCategoryInterface{
    

    public function index($request){
      $items_per_page = $request->items_per_page?:10;
      $keyword = $request->keyword;
      $pcs = ProductCategory::latest();
      if($keyword){
        $pcs->Search($keyword);
      }
      return $pcs->paginate($items_per_page);
    }


    public function store($request){
      DB::beginTransaction();
      try{
        $input = $request->input();
        $pc = ProductCategory::create($input);
        DB::commit();
        return $pc;
      }catch(Exception $e){
        DB::rollBack();
        return $e;
      }
    }


    public function update($id,$request){
      DB::beginTransaction();
      try{
        $pc = ProductCategory::findOrFail($id);
        $inputs = $request->all();
        $pc->update($inputs);
        DB::commit();
        return $pc;
      }catch(Exception $e){
        DB::rollBack();
        return $e;
      }
    }

    public function trash($id){
      $pc  = ProductCategory::findOrFail($id);
      return $pc->delete();
    }


    public function restore($id){
      $pc  = ProductCategory::onlyTrashed();
      $pc->findOrFail($id);
      return $pc->restore();
    }


    public function delete($id){
      $pc  = ProductCategory::latest();
      $pc->findOrFail($id);
      return $pc->forceDelete();
    }


  }


?>