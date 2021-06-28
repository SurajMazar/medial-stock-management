import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/Sidebar'

const { Content } = Layout;


const AppLayout:React.FC = props => {

  const {children} = props

  return(
  <Layout>
    {/* <Header/> */}
    <Layout>
      <Sidebar/>
      <Layout className="msm-main">
        <Content className="site-layout-background bg-white page-section-2">
          {children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
  );
}

export default AppLayout;