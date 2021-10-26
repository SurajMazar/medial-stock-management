<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $guarded =[];

  

    public function saleInvoice(){
        return $this->belongsTo(SalesInvoice::class,'sale_invoice_id');
    }

    public function purchase(){
        return $this->belongsTo(Purchase::class)->with('product');
    }
}
