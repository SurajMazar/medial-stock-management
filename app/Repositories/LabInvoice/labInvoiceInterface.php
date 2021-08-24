<?php

namespace App\Repositories\LabInvoice;

interface LabInvoiceInterface{
  public function index($request);
  public function store($request);
  public function update($id,$request);
  public function delete($id);
}


?>