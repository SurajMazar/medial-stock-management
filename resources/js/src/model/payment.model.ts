interface Payment {
  id:string|number,
  vendor_id:number,
  payment_type:string,
  paid_amount:number,
  payment_date:Date,
  receiving_person:string,
  paid_by:string,
  created_by:Date,
  note:string
}

export default Payment;