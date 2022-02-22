<?php

  namespace App\Repositories\Products;


  interface ProductInterface{
    public function index($request);
    public function store($request);
    public function update($id,$request);
    public function trash($id);
    public function delete($id);
    public function outOfStockProducts();
  }

?>