import { BarChartOutlined, CoffeeOutlined, DollarOutlined, HomeOutlined, MedicineBoxOutlined, ShopOutlined, SketchOutlined, SolutionOutlined, SwapLeftOutlined } from "@ant-design/icons";

interface routeInterface{
  path:string|null,
  icon?:any,
  children?:Array<routeInterface>,
  title:string
}

const sidebars:Array<routeInterface> = [
  {
    path:'/',
    title:'Dashboard',
    icon:HomeOutlined
  },
  {
    path:null,
    title:'Management',
  },
  {
    path:'/currency',
    title:'Currency',
    icon:DollarOutlined
  },
  {
    path:'/vendors',
    title:'Vendors',
    icon:CoffeeOutlined
  },
  {
    path:'/customers',
    title:'Customers',
    icon:SketchOutlined
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
        path:'/product/category',
        title:'Category'
      }
    ],
    icon:MedicineBoxOutlined
  },

 
  {
    path:null,
    title:'Purchases'
  },

  {
    path:'/purchase-invoices',
    title:'Puchase invoice',
    icon:SolutionOutlined
  },
  {
    path:'/purchase-returns',
    title:'Purchase returns',
    icon:SwapLeftOutlined
  },


  {
    path:null,
    title:'Sales'
  },

  {
    path:'/sales-invoices',
    title:'Sales invoice',
    icon:SolutionOutlined
  },
  {
    path:'/sales-returns',
    title:'Sales returns',
    icon:SwapLeftOutlined
  },


  {
    path:null,
    title:'Inventory'
  },

  {
    path:'/stocks',
    title:'Stocks',
    icon:ShopOutlined
  },


  {
    path:'/reports',
    title:'Reports',
    icon:BarChartOutlined
  },


]

export default sidebars;