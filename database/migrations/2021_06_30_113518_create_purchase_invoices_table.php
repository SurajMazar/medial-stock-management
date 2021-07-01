<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchaseInvoicesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('purchase_invoices', function (Blueprint $table) {
      $table->id();
      $table->string('invoice_number');
      $table->date('transaction_date');
      $table->date('invoice_issue_date');
      $table->longText('alterations');
      $table->float('total');
      $table->float('total_in_words');
      $table->foreignId('vendor_id')->references('id')->on('vendors')->nullable(false);
      $table->foreignId('currency_id')->references('id')->on('currencies')->nullable();
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
    Schema::dropIfExists('purchase_invoices');
  }
}
