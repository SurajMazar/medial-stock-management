<?php

namespace App\Repositories\Currency;

use App\Models\Currency;
use Exception;
use Illuminate\Support\Facades\DB;

class CurrencyRepository implements CurrencyInterface{

    public function index($request){
      $items_per_page = $request->items_per_page?:10;
      $keyword = $request->keyword;
      $pcs = Currency::latest();
      if($keyword){
        $pcs->Search($keyword);
      }
      return $pcs->paginate($items_per_page);
    }


    public function store($request){
      DB::beginTransaction();
      try{
        $input = $request->input();
        $pc = Currency::create($input);
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
        $pc = Currency::findOrFail($id);
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
      $pc  = Currency::findOrFail($id);
      return $pc->delete();
    }


    public function restore($id){
      $pc  = Currency::onlyTrashed();
      $pc->findOrFail($id);
      return $pc->restore();
    }


    public function delete($id){
      $pc  = Currency::latest();
      $pc->findOrFail($id);
      return $pc->forceDelete();
    }

  }

?>