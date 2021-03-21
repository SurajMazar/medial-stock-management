import React from 'react';
import {Switch, withRouter} from 'react-router-dom';
import Routes from './constants/router';
import PublicRouter from './router/Public';
import AppLayout from './layouts/App';


import Dashboard from './pages/Dashboard';
import Vendor from './pages/Vendor'

const App = () =>{
  return(
    <Switch>

      <PublicRouter exact path={'/'} component={Dashboard} layout={AppLayout}/>
      <PublicRouter exact path={'/vendors'} component={Vendor} layout={AppLayout}/>

    </Switch>
  );
}

export default withRouter(App);