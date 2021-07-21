<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
  /**
   * Register services.
   *
   * @return void
   */
  public function register()
  {
    $this->app->bind(
      "App\\Repositories\\Vendors\\VendorsRepositoryInterface",
      "App\\Repositories\\Vendors\\VendorsRepository",);
      
    $this->app->bind(
      "App\\Repositories\\Products\\ProductInterface",
      "App\\Repositories\\Products\\ProductRepository",);

    $this->app->bind(
      "App\\Repositories\\ProductCategory\\ProductCategoryInterface",
      "App\\Repositories\\ProductCategory\\ProductCategoryRepository",);
      
    $this->app->bind(
      "App\\Repositories\\Customers\\CustomerRepositoryInterface",
      "App\\Repositories\\Customers\\CustomerRepository",);

    $this->app->bind(
      "App\\Repositories\\Currency\\CurrencyInterface",
      "App\\Repositories\\Currency\\CurrencyRepository",);

    $this->app->bind(
      "App\\Repositories\\PurchaseInvoice\\PurchaseInvoiceInterface",
      "App\\Repositories\\PurchaseInvoice\\PurchaseInvoiceRepository",);

    $this->app->bind(
      "App\\Repositories\\Purchase\\PurchaseInterface",
      "App\\Repositories\\Purchase\\PurchaseRepository",);
  }

  /**
   * Bootstrap services.
   *
   * @return void
   */
  public function boot()
  {
    //
  }
}
