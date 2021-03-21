import Dashboard from '../pages/Dashboard'
import Vendor from '../pages/Vendor'

export default [
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
  }

]