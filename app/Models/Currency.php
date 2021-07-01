<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Currency extends Model
{
    use HasFactory,SoftDeletes;
    protected $guarded = [];


    public function scopeSearch($query,$keyword){
        return $query->where('name', 'like', '%' .$keyword. '%')
        ->orWhere('country', 'like', '%' .$keyword. '%')
        ->orWhere('symbol', 'like', '%' .$keyword. '%')
        ->orWhere('local_value', 'like', '%' .$keyword. '%');
      }
}
