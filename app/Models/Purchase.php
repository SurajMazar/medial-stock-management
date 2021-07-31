<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Purchase extends Model
{
    use HasFactory,SoftDeletes;
    protected $guarded = [];

    public function product(){
        return $this->belongsTo(Product::class,'product_id');
    }


    public function purchaseInvoice(){
        return $this->belongsTo(PurchaseInvoice::class,'purchase_invoice_id')->with('vendor');
    }

    public function scopeSearch($query,$keyword){
        return $query->where('batch', 'like', '%' .$keyword. '%')
        ->orWhere('code', 'like', '%' .$keyword. '%')
        ->orWhereHas('purchaseInvoice',function($pquery) use($keyword){
            return $pquery->where('invoice_number','like','%'.$keyword.'%')->orwhereHas('vendor',function($q) use($keyword){
                return $q->where('name','like','%'.$keyword.'%')
                ->orWhere('email','like','%'.$keyword.'%');
            });
        });
    }
}
