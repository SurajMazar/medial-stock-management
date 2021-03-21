import react from 'react';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar'

const { SubMenu } = Menu;
const { Content, Sider } = Layout;


const AppLayout = props => {

  const {children} = props

  return(
  <Layout>
    {/* <Header/> */}
    <Layout>
      <Sidebar/>
      <Layout>
        <Content className="site-layout-background page-section-2">
          {children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
  );
}

export default AppLayout;