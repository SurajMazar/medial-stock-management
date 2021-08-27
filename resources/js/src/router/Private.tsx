import React from 'react';
import {Route} from 'react-router-dom';
import Layout from '../layouts/App';

interface propsInterface{
  component:React.FC,
  exact:any,
  path:string
}

const PublicRoute:React.FC<propsInterface> = ({ component: Component, path, exact }) => {

  return(
     <Route 
      {...exact}
      path={path}
      render={()=>(
        <Layout>
          <Component/>
        </Layout>
      )}/>
    
  );
}

export default PublicRoute;