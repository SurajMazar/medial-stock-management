import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import history from './utils/history.util';
import {ConnectedRouter} from 'connected-react-router';
import store from './store/store';

function Index() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router history={history}>
            <App/>
          </Router>
        </ConnectedRouter>
      </Provider>
    );
}

export default Index;

if (document.getElementById('root')) {
    ReactDOM.render(<Index />, document.getElementById('root'));
}
