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
      $table->date('transaction_date')->nullable();
      $table->date('invoice_issue_date')->nullable();
      $table->longText('alterations')->nullable();
      $table->float('total')->nullable();
      $table->float('total_in_words')->nullable();
      $table->foreignId('vendor_id')->references('id')->on('vendors')->nullable(false);
      $table->foreignId('currency_id')->nullable()->references('id')->on('currencies')->onDelete('cascade');
      $table->text('note')->nullable();
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
