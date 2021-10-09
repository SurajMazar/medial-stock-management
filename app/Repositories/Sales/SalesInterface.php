<?php

namespace App\Repositories\Sales;


interface SalesInterface{

  public function index($request);
  public function store($request);
  public function update($id,$request);
  public function delete($id);

}