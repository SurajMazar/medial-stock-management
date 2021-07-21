import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/Sidebar'
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { StoreInterface } from '../../store/store';

const { Content } = Layout;


const AppLayout:React.FC = props => {

  const {children} = props


  const state = useSelector((state:StoreInterface)=>state.auth)

    return(
      <Layout>
        {
          state.authenticated?
          <Layout>
            <Sidebar/>
            <Layout className="msm-main">
              <Content className="site-layout-background bg-white page-section-2">
                {children}
              </Content>
            </Layout>
          </Layout>:
          <Redirect to="/login"/>        
        }
        {/* <Header/> */}
      
      </Layout>
    );
}

export default AppLayout;