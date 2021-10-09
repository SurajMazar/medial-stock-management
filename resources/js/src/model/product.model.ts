import { purchase } from "./purchase.model";

export interface ProductCategory{
  id:number,
  name:string,
  created_at:Date;
}

interface Product{
  id: number,
  name: string,
  has_sub_units: boolean,
  subunits_per_quantity: number,
  sub_unit_name: string,
  description: string,
  product_category_id?: number,
  created_at: Date,
  category:ProductCategory,
  total_purchases:string|number,
  total_stocks:string|number,
  purchases:Array<purchase>
}

export default Product;