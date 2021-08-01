<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseInvoice extends Model
{
  use HasFactory, SoftDeletes;
  protected $guarded = [];

  protected static function boot()
  {
    parent::boot();

    static::deleting(function ($instance) {
      // Delete registry_detail
      if ($instance->isForceDeleting()) {
        $instance->purchases()->forceDelete();
      } else {
        $instance->purchases()->delete();
      }
    });

    static::restoring(function ($instance) {
      $instance->purchases()
        ->onlyTrashed()
        ->get()
        ->each(function ($purchase) {
          $purchase->restore();
        });
    });
  }

  public function vendor()
  {
    return $this->belongsTo(Vendor::class, 'vendor_id');
  }

  public function currency()
  {
    return $this->belongsTo(Currency::class, 'currency_id');
  }


  public function purchases()
  {
    return $this->hasMany(Purchase::class, "purchase_invoice_id")->with('product');
  }


  public function scopeSearch($query, $keyword)
  {
    return $query->where('invoice_number', 'like', '%' . $keyword . '%')->orWhereHas('vendor', function ($query) use ($keyword) {
      return $query->where('name', 'like', '%' . $keyword . '%');
    });
  }
}
