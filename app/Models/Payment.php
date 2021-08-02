<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
  use HasFactory, SoftDeletes;

  protected $guarded = [];

  public function vendor()
  {
    return $this->belongsTo(Vendor::class, 'vendor_id');
  }

  public function scopeSearch($query, $keyword)
  {
    return $query->where('payment_type', 'like', '%' . $keyword . '%')
      ->orWhereHas('vendor', function ($q) use ($keyword) {
        return $q->where('name', 'like', '%' . $keyword . '%')
          ->orWhere('email', 'like', '%' . $keyword . '%');
      });
  }
}
