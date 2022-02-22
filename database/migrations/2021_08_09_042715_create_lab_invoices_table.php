<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLabInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lab_invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->nullable()->references('id')->on('customers');
            $table->string('invoice_number');
            $table->date('invoice_date');
            $table->string('customer_name')->nullable();
            $table->json('tests')->nullable();
            $table->json('alterations')->nullable();
            $table->text('note')->nullable();
            $table->string('amount')->nullable();
            $table->foreignId('user_id')->nullable()->references('id')->on('users')->onDelete(null);
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
        Schema::dropIfExists('lab_invoices');
    }
}
