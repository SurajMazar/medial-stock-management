import Customer from "./customer.model";
import { purchase } from "./purchase.model";
import User from "./user.model";

export interface saleInvoice{
  id:number|string,
  invoice_number:string,
  customer_id:number,
  customer:Customer,
  transaction_date:string,
  customer_name:string,
  amount:number,
  note:string,
  user_id:number,
  user:User
  alterations:string
}


export interface sale{
  id:number|string,
  sale_invoice_id:number,
  purchase:purchase,
  saleInvoice:saleInvoice,
  quantity:string,
  rate:number,
  total:number
}