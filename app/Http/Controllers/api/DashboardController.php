<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\SalesInvoice;
use App\Models\Vendor;
use App\Repositories\Products\ProductInterface;
use Exception;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    private ProductInterface $productRepository;

    public function __construct(ProductInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }


    public function index(){
        try{

            $outOfStock_count = count($this->productRepository->outOfStockProducts());
            $product_count = Product::count();
            $vendor_count = Vendor::count();
            $sales_invoice_count =  SalesInvoice::count();
            
            return success('Dashbooard', [
                "outOfStock_count"=>$outOfStock_count,
                "product_count" => $product_count,
                "vendor_count" => $vendor_count,
                "sales_invoice_count" => $sales_invoice_count
            ]);
        }catch(Exception $e){
            return failure($e->getMessage());
        }
    }
}
