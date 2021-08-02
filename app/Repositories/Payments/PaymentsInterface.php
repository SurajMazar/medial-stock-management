<?php
  namespace App\Repositories\Payments;


  interface PaymentsInterface{
    public function index($request);
    public function store($request);
    public function update($id,$request);
  }
   
?>