<?php

namespace App\Repositories\Purchase;


interface PurchaseInterface{

  public function index($request);
  public function store($request);
  public function update($id,$request);
  public function delete($id);

}