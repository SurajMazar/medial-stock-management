<?php

  namespace App\Repositories\PurchaseInvoice;


  interface PurchaseInvoiceInterface{
    public function index($request);
    public function store($request);
    public function update($id,$request);
    public function trash($id);
    public function restore($id);
    public function delete($id);
    public function downloadPdf($id);
  }

?>