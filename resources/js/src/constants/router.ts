import React from 'react';
import AppLayout from '../layouts/App';
import Public from '../layouts/Public';
import Currency from '../pages/Currency';
import CustomerPage from '../pages/Customers';
import CreateEditCustomer from '../pages/Customers/create-edit';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Products from '../pages/Products';
import ProductCategory from '../pages/Products/Category';
import ProductView from '../pages/Products/View';
import PurchaseInvoice from '../pages/Purchase/Purchase-invoice';
import ViewPurchaseInvoice from '../pages/Purchase/Purchase-invoice/view';
import Vendor from '../pages/Vendor';
import EditVendor from '../pages/Vendor/edit';


interface routeInterface{
  path:string|null,
  component:React.FC|null,
  title:string,
  layout:React.FC
}

const routes:Array<routeInterface> = [

  {
    path:'/login',
    component:Login,
    title:'Login',
    layout:Public
  },

  // {
  //   path:'/',
  //   component:Home,
  //   title:'Home',
  //   layout:Public
  // },

  {
    path:'/',
    component:Dashboard,
    title:'Dashboard',
    layout:AppLayout
  },

  {
    path:'/currency',
    component:Currency,
    title:"Currency",
    layout:AppLayout
  },
  {
    path:'/vendors',
    component:Vendor,
    title:'Vendors',
    layout:AppLayout
  },

  {
    path:'/vendors/:id/:tab',
    component:EditVendor,
    title:'Vendors',
    layout:AppLayout
  },

  {
    path:'/products',
    component:Products,
    title:'Product',
    layout:AppLayout
  },

  {
    path:'/products/view/:id',
    component:ProductView,
    title:'Product Details',
    layout:AppLayout
  },

  {
    path:'/product/category',
    component:ProductCategory,
    title:'Product category',
    layout:AppLayout
  },




  {
    path:'/customers',
    component:CustomerPage,
    title:'Customers',
    layout:AppLayout
  },

  {
    path:'/customers/add',
    component:CreateEditCustomer,
    title:'Customers',
    layout:AppLayout
  },

  {
    path:'/customers/view/:id',
    component:CreateEditCustomer,
    title:'Customers',
    layout:AppLayout
  },

 

  {
    path:'/purchase-invoices',
    component:PurchaseInvoice,
    title:'Purchase invoice',
    layout:AppLayout
  },


  {
    path:'/purchase-invoices/view/:id',
    component:ViewPurchaseInvoice,
    title:'Purchase Invoice View',
    layout:AppLayout
  },

  {
    path:'/purchase-returns',
    component:Vendor,
    title:'Purchase returns',
    layout:AppLayout
  },


 

  {
    path:'/sales-invoices',
    component:Vendor,
    title:'Sales invoice',
    layout:AppLayout
  },
  {
    path:'/sales-returns',
    component:Vendor,
    title:'Sales returns',
    layout:AppLayout
  },




  {
    path:'/stocks',
    component:Vendor,
    title:'Stocks',
    layout:AppLayout
  },


  {
    path:'/reports',
    component:Vendor,
    title:'Reports',
    layout:AppLayout
  },


]

export default routes;