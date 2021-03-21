<?php

use App\Http\Controllers\api\VendorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



Route::prefix('/vendors')->group(function(){

  Route::get('/',[VendorController::class,'index']);
  Route::get('/show/{id}',[VendorController::class,'show']);
  Route::post('/create',[VendorController::class,'store']);
  Route::get('/update/{id}',[VendorController::class,'update']);
  Route::get('/search',[VendorController::class,'search']);
  Route::get('/trash/{id}',[VendorController::class,'trash']);
  Route::get('/trashed',[VendorController::class,'trashed']);
  Route::get('/restore/{id}',[VendorController::class,'restore']);
  Route::get('/delete/{id}',[VendorController::class,'delete']);

});
