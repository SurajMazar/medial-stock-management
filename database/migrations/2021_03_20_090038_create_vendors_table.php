<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVendorsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('vendors', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('email');
      $table->string('phone')->nullable();
      $table->string('mobile')->nullable();
      $table->string('pan_vat');
      $table->string('contact_person')->nullable();
      $table->string('contact_person_number')->nullable();
      $table->string('country')->nullable();
      $table->string('province_state')->nullable();
      $table->string('city')->nullable();
      $table->string('address')->nullable();
      $table->string('postal_zip')->nullable();
      $table->string('bank_name')->nullable();
      $table->string('account_name')->nullable();
      $table->string('account_number')->nullable();
      $table->string('website')->nullable();
      $table->string('facebook')->nullable();
      $table->string('instagram')->nullable();
      $table->string('linkedin')->nullable();
      $table->string('twitter')->nullable();
      $table->string('youtube')->nullable();
      $table->longText('description')->nullable();
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
    Schema::dropIfExists('vendors');
  }
}
