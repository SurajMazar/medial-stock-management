<?php

  namespace App\Repositories\PurchaseInvoice;


  interface PurchaseInvoiceInterface{
    public function index($request);
    public function store($request);
    public function update($id,$request);
    public function delete($id);
    public function downloadPdf($id);
  }

?>