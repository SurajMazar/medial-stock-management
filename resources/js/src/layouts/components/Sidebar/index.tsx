import React from 'react';
import { Layout, Menu } from 'antd';
import {NavLink} from 'react-router-dom';
import Routes from '../../../constants/router'

const { Sider } = Layout;

const Sidebar = () => {
  return(
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        style={{ height: '100%', borderRight: 0 }}
      >
        {
          Routes.map((route,index)=>{
            if(route.path){
              return (
              <Menu.Item key={index+1}>
                <NavLink exact activeClassName="active" to={route.path}>
                  {route.title}
                </NavLink>
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