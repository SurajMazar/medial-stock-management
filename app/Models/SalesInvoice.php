<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesInvoice extends Model
{
    use HasFactory;

    protected $guarded =[];

    protected $table = 'sale_invoices';

    // protected static function boot()
    // {
    //   parent::boot();
  
    //   static::deleting(function ($instance) {
    //     $instance->purchases()->delete();
    //   });

    // }

    public function customer(){
        return $this->belongsTo(Customer::class,'customer_id');
    }

    public function sales(){
        return $this->hasMany(Sale::class,'sale_invoice_id')->with('purchase');
    }

    public function scopeSearch($query,$keyword){
        return $query->where('invoice_number', 'like', '%' .$keyword. '%')
        ->orWhere('customer_name', 'like', '%' .$keyword. '%')
        ->orWhereHas('customer', function ($query) use ($keyword) {
            return $query->where('name', 'like', '%' . $keyword . '%');
          });
       
    }
    
}
