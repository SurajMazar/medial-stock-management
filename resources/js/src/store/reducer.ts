import {connectRouter, RouterState} from 'connected-react-router';
import { Reducer } from 'redux';
import { LocationState } from 'history';
import history from '../utils/history.util';
import VendorReducer from './action-reducer/vendor.actionreducer';
import ProductReducer from './action-reducer/products.actionreducer';

const reducer = {
  router:connectRouter(history) as  Reducer<RouterState<LocationState>>,
  vendor:VendorReducer,
  product:ProductReducer,
}

export default reducer;