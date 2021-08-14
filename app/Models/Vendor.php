<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vendor extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];


    public function purchaseInvoices(){
      return $this->hasMany(PurchaseInvoice::class);
    }

    public function payments(){
      return $this->hasMany(Payment::class);
    }

    public function scopeSearch($query,$keyword){
      return $query->where('name', 'like', '%' .$keyword. '%')
      ->orWhere('email','like','%'.$keyword.'%')
      ->orWhere('pan_vat','like','%'.$keyword.'%')
      ->orWhere('contact_person','like','%'.$keyword.'%')
      ->orWhere('website','like','%'.$keyword.'%');
    }

}
