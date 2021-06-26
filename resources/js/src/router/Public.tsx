import React from 'react';
import {Route} from 'react-router-dom';

interface propsInterface{
  component:React.FC,
  layout:React.FC,
  exact:any,
  path:string
}

const PublicRoute:React.FC<propsInterface> = ({ component: Component, path,layout: Layout, exact }) => {

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