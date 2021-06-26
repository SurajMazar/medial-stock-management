import React from 'react';
import Dashboard from '../pages/Dashboard';
import Vendor from '../pages/Vendor';


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
    path:null,
    component:null,
    title:'Management'
  },
  {
    path:'/vendors',
    component:Vendor,
    title:'Vendors'
  },
  {
    path:'/customers',
    component:Vendor,
    title:'Customers'
  },

 
  {
    path:null,
    component:null,
    title:'Purchases'
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
    path:null,
    component:null,
    title:'Sales'
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
    path:null,
    component:null,
    title:'Inventory'
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