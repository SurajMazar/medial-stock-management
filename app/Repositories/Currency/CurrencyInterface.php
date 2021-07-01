<?php
  namespace App\Repositories\Currency;

  interface CurrencyInterface{
    public function index($request);
    public function store($rquest);
    public function update($id,$request);
    public function trash($id);
    public function restore($id);
    public function delete($id);
  }
  
?>