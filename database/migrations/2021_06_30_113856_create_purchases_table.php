<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchasesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('purchases', function (Blueprint $table) {
      $table->id();
      $table->string('code');
      $table->float('pack');
      $table->float('quantity');
      $table->float('marked_price');
      $table->string('batch');
      $table->date('expiry_date');
      $table->float('rate');
      $table->float('amount');
      $table->boolean('free');
      $table->enum('free_rate_type',['percent','amount']);
      $table->float('free_rate');
      $table->foreignId('product_id')->references('id')->on('products')->nullable(false);
      $table->foreignId('purchase_invoice_id')->references('id')->on('purchase_invoices')->nullable(false);
      $table->softDeletes();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('purchases');
  }
}
