<?php 

  namespace App\Repositories\Vendors;


  interface VendorsRepositoryInterface{

    public function index($request);
    public function store($request);
    public function update($id,$request);
    public function trash($id);
    public function restore($id);
    public function delete($id);
    public function show($id);
    public function getTotalPurchases($id);
  }



?>