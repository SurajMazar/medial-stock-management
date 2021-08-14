<?php

use App\Http\Controllers\api\PurchaseInvoiceController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->name('app');

Route::get('/purchase_invoice/export_pdf/{id}', [PurchaseInvoiceController::class,'export_pdf']);

Route::get('{reactRoutes}', function () {
  return view('welcome'); // your start view
})->where('reactRoutes', '^((?!api).)*$'); // except 'api' word