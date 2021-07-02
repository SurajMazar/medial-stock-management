<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseInvoice extends Model
{
    use HasFactory,SoftDeletes;
    protected $guarded = [];


    public function vendor(){
        return $this->belongsTo(Vendor::class,'vendor_id');
    }

    public function currency(){
        return $this->belongsTo(Currency::class,'currency_id');
    }


    public function scopeSearch($query,$keyword){
        return $query->where('invoice_number', 'like', '%' .$keyword. '%');
    }
    
}   
