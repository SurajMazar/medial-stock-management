<?php

  namespace App\Repositories\LabTests;

use App\Models\LabTest;
use Exception;
use Illuminate\Support\Facades\DB;

class LabTestRepository implements LabTestInterface{
    
    public function index($request){
      $items_per_page = $request->items_per_page?:10;
      $keyword = $request->keyword;
      $labtests = LabTest::latest();

      // search 
      if($keyword){
        $labtests->Search($keyword);
      }

      if($items_per_page === "all"){
        return $labtests->get();
      } 
      return $labtests->paginate($items_per_page);
    }


    public function store($request){
      DB::beginTransaction();
      try{
        $input = $request->all();
        $labtests = LabTest::create($input);
        DB::commit();
        return $labtests;
      }catch(Exception $e){
        DB::rollBack();
        return $e;
      }
    }


    public function update($id,$request){
      DB::beginTransaction();
      try{
        $labtests = LabTest::findOrFail($id);
        $inputs = $request->all();
        $labtests->update($inputs);
        DB::commit();
        return $labtests;
      }catch(Exception $e){
        DB::rollBack();
        return $e;
      }
    }


    public function trash($id){
      $labtests  = LabTest::findOrFail($id);
      return $labtests->delete();
    }


    public function delete($id){
      $labtests  = LabTest::onlyTrashed();
      $labtests->findOrFail($id);
      return $labtests->forceDelete();
    }

  } 

?>