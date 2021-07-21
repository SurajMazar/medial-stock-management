import {connectRouter, RouterState} from 'connected-react-router';
import { Reducer } from 'redux';
import { LocationState } from 'history';
import history from '../utils/history.util';
import VendorReducer from './action-reducer/vendor.actionreducer';
import ProductReducer from './action-reducer/products.actionreducer';
import CurrencyReducer from './action-reducer/currency.actionreducer';
import PurchaseReducer from './action-reducer/purchase.actionreducer';
import AuthReducer from './action-reducer/auth.actionreducer';

const reducer = {
  router:connectRouter(history) as  Reducer<RouterState<LocationState>>,
  auth:AuthReducer,
  vendor:VendorReducer,
  product:ProductReducer,
  currency:CurrencyReducer,
  purchase:PurchaseReducer,
}

export default reducer;