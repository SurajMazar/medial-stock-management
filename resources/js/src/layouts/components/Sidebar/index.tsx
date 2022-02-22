import React, { useState } from 'react';
import { Button, Layout, Menu, Modal } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import sidebars from '../../../constants/sidebar'
import { useDispatch } from 'react-redux';
import { Logout } from '../../../services/auth.service';
import { LogoutOutlined } from '@ant-design/icons';
import { getRole } from '../../../utils/helper.utils';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {

  const dispatch = useDispatch();
  const location = useLocation();


  /**
   * Logout function
   */
  const handleLogout = () => {
    dispatch(Logout());
  }

  const hasPermission = (roles: Array<string> | undefined) => {
    const userRole = getRole();
    if (userRole) {
      if (roles) {
        if (roles.includes(userRole)) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    }

    return false
  }

  /**
   * logout confirm modal
   */
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const logoutConfirmModal = (
    <Modal
      visible={showLogoutModal}
      title={'Are you sure you want to logout?'}
      footer={false}
      onCancel={() => setShowLogoutModal(false)}
    >
      <div className="d-flex justify-content-end">
        <Button className="mr-1" shape="round" size="middle" type="default"
          onClick={() => setShowLogoutModal(false)}
        >Cancle</Button>
        <Button shape="round" onClick={handleLogout} size="middle" type="primary">logout</Button>
      </div>
    </Modal>
  );

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      className="site-layout-background msm-sidebar">
      <div className="logo-text">
        Aradhana Health Care Center
      </div>
      <Menu
        mode="inline"
        className="sidebar-menu"
        style={{ height: '100%', borderRight: 0 }}
        defaultSelectedKeys={[location.pathname]}
      >
        {
          sidebars.map((route, index) => {
            const { icon: Icon, roles } = route;
            if (route.children && route.children.length) {

              return (
                <>
                  {
                    hasPermission(roles) ?
                      <SubMenu key={index} title={route.title}
                        icon={Icon ? <Icon /> : null}>
                        {route.children.map((r, i) => (
                          <Menu.Item key={'sub-menu-' + i} onClick={(e: any) => e.stopPropagation()}>
                            <NavLink exact activeClassName="active" to={r.path || ''} >
                              {r.title}
                            </NavLink>
                          </Menu.Item>
                        ))}
                      </SubMenu> : ""
                  }

                </>
              )
            }
            else if (route.path) {
              return (
                <>
                  {hasPermission(roles) ?
                    <Menu.Item key={index} icon={Icon ? <Icon /> : null}>
                      <NavLink exact activeClassName="active" to={route.path || ''}>
                        {route.title}
                      </NavLink>
                    </Menu.Item> : ""}
                </>
              )
            } else {
              return (
                <>
                  {hasPermission(roles) ?
                    <Menu.Item key={index} className="menu-header">
                      {route.title}
                    </Menu.Item>
                    : ''}
                </>)
            }
          })
        }

        <Menu.Item key={'logout'} icon={<LogoutOutlined />} onClick={() => setShowLogoutModal(true)}>
          Logout
        </Menu.Item>
      </Menu>
      {logoutConfirmModal}
    </Sider>
  );
}

export default Sidebar;