import Customer from "./customer.model";

interface LabInvoice{
  id:number,
  invoice_number:string,
  tests:string,
  invoice_date:Date,
  customer_name?:string,
  customer:Customer,
  alterations:string,
  created_at:Date
}


export default LabInvoice;