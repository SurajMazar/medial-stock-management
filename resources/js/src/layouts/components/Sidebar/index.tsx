import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {NavLink, useLocation} from 'react-router-dom';
import sidebars from '../../../constants/sidebar'

const { Sider } = Layout;
const {SubMenu} = Menu;

const Sidebar = () => {

  const location = useLocation();

  return(
    <Sider 
    breakpoint="lg"
    collapsedWidth="0"
    className="site-layout-background msm-sidebar">
      <Menu
        mode="inline"
        className="sidebar-menu"
        style={{ height: '100%', borderRight: 0 }}
      >
        {
          sidebars.map((route,index)=>{
            if(route.children && route.children.length){
              return(
                <SubMenu key={route.title} title={route.title}>
                  {route.children.map((r,i)=>(
                    <Menu.Item key={'sub-menu-'+i}>
                      <NavLink exact  activeClassName="active" to={r.path||''}>
                        {r.title}
                      </NavLink>
                    </Menu.Item>
                  ))}
                </SubMenu>
              )
            }
            else if(route.path){
              return (
              <Menu.Item key={index+1}>
                <NavLink exact activeClassName="active" to={route.path||''}>
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