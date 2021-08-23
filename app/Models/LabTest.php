<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LabTest extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function scopeSearch($query,$keyword){
        return $query->where('name','like','%'.$keyword.'%');
    }
}
