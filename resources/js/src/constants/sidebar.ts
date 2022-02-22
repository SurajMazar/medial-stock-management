import { BarChartOutlined, CoffeeOutlined, DollarOutlined, FileProtectOutlined, FileSearchOutlined, HomeOutlined, MedicineBoxOutlined, ShopOutlined, SketchOutlined, SolutionOutlined, SwapLeftOutlined, UserOutlined } from "@ant-design/icons";

interface routeInterface{
  path:string|null,
  icon?:any,
  children?:Array<routeInterface>,
  title:string,
  roles?:string[]
}

const sidebars:Array<routeInterface> = [
  {
    path:'/',
    title:'Dashboard',
    icon:HomeOutlined,
    roles:['admin','sale','lab']
  },
  {
    path:null,
    title:'Management',
  },
  // {
  //   path:'/currency',
  //   title:'Currency',
  //   icon:DollarOutlined,
  //   roles:['admin']
  // },
  {
    path:'/vendors',
    title:'Vendors',
    icon:CoffeeOutlined,
    roles:['admin']
  },
  {
    path:'/customers',
    title:'Customers',
    icon:SketchOutlined,
    roles:['admin','sale','lab']
  },

  
  {
    path:null,
    title:'Inventory',
    roles:['admin']
  },


  {
    path:null,
    title:'Products Mgmt',
    roles:['admin'],
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

  // {
  //   path:'/reports',
  //   title:'Reports',
  //   icon:BarChartOutlined
  // },
 
  {
    path:null,
    title:'Purchases',
    roles:['admin']
  },

  {
    path:'/purchase-invoices',
    title:'Puchase invoice',
    icon:SolutionOutlined,
    roles:['admin']
  },
  // {
  //   path:'/purchase-returns',
  //   title:'Purchase returns',
  //   icon:SwapLeftOutlined
  // },


  {
    path:null,
    title:'Sales',
    roles:['admin','sale']
  },

  {
    path:'/sales-invoices',
    title:'Sales invoice',
    icon:SolutionOutlined,
    roles:['admin','sale']
  },
  // {
  //   path:'/sales-returns',
  //   title:'Sales returns',
  //   icon:SwapLeftOutlined
  // },



  {
    path:null,
    title:'Laboratory',
    roles:['admin','lab']
  },

  {
    path:'/lab-tests',
    title:'Lab Tests',
    icon:FileSearchOutlined,
    roles:['admin','lab']
  },

  {
    path:'/lab-invoices',
    title:'Lab Invoices',
    icon:SolutionOutlined,
    roles:['admin','lab']
  },


  {
    path:null,
    title:'User management',
    roles:['admin']
  },


  {
    path:'/users',
    title:'Users',
    icon:UserOutlined,
    roles:['admin']
  },

]

export default sidebars;