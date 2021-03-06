<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
  public function login()
  {
    if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
      $user = Auth::user();
      return success('User token generated',[
        'token'=>$user->createToken('msm')->accessToken,
        'user'=>$user,
        'role'=>$user->roles[0]->name
      ]);
    }else {
      return failure(' These credentials do not match our records.', 400);
    }
  }
}
