import React from 'react';
import { Layout, Menu } from 'antd';
import {Link} from 'react-router-dom';
import Routes from '../../../constants/router'

const { Sider } = Layout;

const Sidebar = () => {
  return(
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {
          Routes.map((route,index)=>{
            if(route.path){
              return (
              <Menu.Item key={index+1}>
                <Link to={route.path}>
                  {route.title}
                </Link>
              </Menu.Item>
              )
            }else{
              return (<Menu.Item key={index+1} className="menu-header">
                {route.title}
              </Menu.Item> )
            }
          })
        }
      </Menu>
    </Sider>
  );
}

export default Sidebar;