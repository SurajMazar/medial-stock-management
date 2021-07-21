import Currency from "./currency.model";
import Product from "./product.model";
import Vendor from "./vendors.model";

export interface purchase_invoice{
  id:number,
  invoice_number:string,
  invoice_issue_date:Date,
  transaction_date:Date,
  alterations:string,
  total:string,
  total_in_words:string,
  note:string,
  vendor:Vendor,
  currency:Currency,
  currency_id:number
}

export interface purchase{
  id?:number,
  purchase_invoice?:purchase_invoice,
  code:string,
  product_id:number|undefined,
  product?:Product,
  free?:string,
  free_rate?:number,
  pack:number,
  expiry_date:Date,
  batch:string,
  rate?:number,
  marked_price:number,
  quantity:number,
  free_rate_type?:'percent'|'amount',
  amount:number,
}