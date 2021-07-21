<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\CurrencyController;
use App\Http\Controllers\api\VendorController;
use App\Http\Controllers\api\ProductCategoryController;
use App\Http\Controllers\api\ProductController;
use App\Http\Controllers\api\PurchaseController;
use App\Http\Controllers\api\PurchaseInvoiceController;
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


Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:api'])->group(function () {
  Route::resource('/vendors', VendorController::class);


  Route::resource('/product_category', ProductCategoryController::class);


  Route::resource('/products', ProductController::class);


  Route::resource('/currency', CurrencyController::class);

  
  Route::resource('/purchase_invoice', PurchaseInvoiceController::class);


  Route::resource('/purchases', PurchaseController::class);
  Route::delete('/purchases/delete/{id}', [PurchaseController::class,'trash']);

});
