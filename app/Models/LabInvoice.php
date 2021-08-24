<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LabInvoice extends Model
{
  use HasFactory;
  protected $guarded = [];

  public function customer()
  {
    return $this->belongsTo(Customer::class, 'customer_id');
  }

  public function scopeSearch($query, $keyword)
  {
    return $query->where('invoice_number', 'like', '%' . $keyword . '%')
      ->orWhere('customer_name', 'like', '%' . $keyword . '%')
      ->orWhereHas('customer', function ($q) use ($keyword) {
        return $q->where('name', 'like', '%' . $keyword . '%');
      });
  }
}
