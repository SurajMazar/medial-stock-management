import React from 'react';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import ProductCategory from '../pages/Products/Category';
import Vendor from '../pages/Vendor';
import EditVendor from '../pages/Vendor/edit';


interface routeInterface{
  path:string|null,
  component:React.FC|null,
  title:string
}

const routes:Array<routeInterface> = [
  {
    path:'/',
    component:Dashboard,
    title:'Dashboard'
  },
 
  {
    path:'/vendors',
    component:Vendor,
    title:'Vendors'
  },

  {
    path:'/vendors/:id/:tab',
    component:EditVendor,
    title:'Vendors'
  },

  {
    path:'/products',
    component:Products,
    title:'Product'
  },

  {
    path:'/products/category',
    component:ProductCategory,
    title:'Product category'
  },




  {
    path:'/customers',
    component:Vendor,
    title:'Customers'
  },

 
  

  {
    path:'/purchase-invoices',
    component:Vendor,
    title:'Puchase invoice'
  },
  {
    path:'/purchase-returns',
    component:Vendor,
    title:'Purchase returns'
  },


 

  {
    path:'/sales-invoices',
    component:Vendor,
    title:'Sales invoice'
  },
  {
    path:'/sales-returns',
    component:Vendor,
    title:'Sales returns'
  },




  {
    path:'/stocks',
    component:Vendor,
    title:'Stocks'
  },


  {
    path:'/reports',
    component:Vendor,
    title:'Reports'
  },


]

export default routes;