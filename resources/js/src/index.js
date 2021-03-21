import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import App from './App';
import {createBrowserHistory} from 'history';


const history = createBrowserHistory();

function Index() {
    return (
      <Router history={history} baseurl={'/'}>
       <App/>
      </Router>
    );
}

export default Index;

if (document.getElementById('root')) {
    ReactDOM.render(<Index />, document.getElementById('root'));
}
