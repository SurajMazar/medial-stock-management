import React from 'react';
import {Switch, withRouter} from 'react-router-dom';
import routes from './constants/router';
import PublicRouter from './router/Public';


const App = () =>{
  return(
    <>
    <Switch>
      {
        routes.map((route,i)=>{
          if(route.path && route.component){
            return <PublicRouter key={i}
            exact 
            path={route.path} 
            component={route.component} 
            layout={route.layout}/>
          }
      })
      }
    </Switch>
    </>
  );
}

export default withRouter(App);