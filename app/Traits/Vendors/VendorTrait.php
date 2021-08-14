<?php

  namespace App\Traits\Vendors;

  trait VendorTrait {



    public function getTotalsPurchases($vendors){
      foreach($vendors as $vendor){
        $total_purchases = 0;
        foreach($vendor->purchaseInvoices as $purchase){
          $total_purchases = $total_purchases + $purchase->amount;
        }
        $vendors->total_purchases = $total_purchases;
      }
      return $vendors;
    }


    public function getTotalPayments(){

    }


  }


?>