import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import history from '../utils/history.util';
import reducers from './reducer';
import {VendorStoreInterface} from './action-reducer/vendor.actionreducer';
import { ProductStateInterface } from './action-reducer/products.actionreducer';
import { CurrencyStateInterface } from './action-reducer/currency.actionreducer';
import { PurchaseStoreInterface } from './action-reducer/purchase.actionreducer';
import { AuthStore } from './action-reducer/auth.actionreducer';
import { CustomerStoreInterface } from './action-reducer/customer.actionreducer';
import { LabTestInterface } from './action-reducer/labTests.actionreducer';
import { SalesStoreInterface } from './action-reducer/sales.actionreducer';
import { UserStore } from './action-reducer/user.slice';

export interface StoreInterface{
  auth:AuthStore,
  vendor:VendorStoreInterface,
  product:ProductStateInterface,
  currency:CurrencyStateInterface,
  purchase:PurchaseStoreInterface,
  customer:CustomerStoreInterface,
  labTests:LabTestInterface,
  sale:SalesStoreInterface,
  user:UserStore
}

const store = configureStore({
  reducer:reducers,
  devTools:process.env.NODE_ENV !== 'production',
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
 }).concat(routerMiddleware(history)),
});

export default store;