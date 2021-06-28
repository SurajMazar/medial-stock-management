<?php

  namespace App\Repositories\Customers;


  interface CustomerInterface{
    public function index($request);
    public function store($request);
    public function update($id,$request);
    public function trash($id);
    public function delete($id);
  }

?>