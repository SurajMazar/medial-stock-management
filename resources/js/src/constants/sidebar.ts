import React from 'react';



interface routeInterface{
  path:string|null,
  icon?:any,
  children?:Array<routeInterface>,
  title:string
}

const sidebars:Array<routeInterface> = [
  {
    path:'/',
    title:'Dashboard'
  },
  {
    path:null,
    title:'Management'
  },
  {
    path:'/vendors',
    title:'Vendors'
  },
  {
    path:'/customers',
    title:'Customers'
  },

  {
    path:null,
    title:'Products Mgmt',
    children:[
      {
        path:'/products',
        title:'Products'
      },
      {
        path:'/products/category',
        title:'Category'
      }
    ]
  },

 
  {
    path:null,
    title:'Purchases'
  },

  {
    path:'/purchase-invoices',
    title:'Puchase invoice'
  },
  {
    path:'/purchase-returns',
    title:'Purchase returns'
  },


  {
    path:null,
    title:'Sales'
  },

  {
    path:'/sales-invoices',
    title:'Sales invoice'
  },
  {
    path:'/sales-returns',
    title:'Sales returns'
  },


  {
    path:null,
    title:'Inventory'
  },

  {
    path:'/stocks',
    title:'Stocks'
  },


  {
    path:'/reports',
    title:'Reports'
  },


]

export default sidebars;