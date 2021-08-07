import { Button, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import OverviewCard from '../../../components/Dashboard/overview-card';
import Preloader from '../../../components/Preloader';
import { fetchVendor } from '../../../services/vendor.service';
import { StoreInterface } from '../../../store/store';
import PurchaseInvoice from '../../Purchase/Purchase-invoice';
import EditForm from './edit';
import {IoReceipt} from 'react-icons/io5';
import { NepaliNS, returnLimitedWords } from '../../../utils/helper.utils';
import Payments from './Payments';

interface paramsInterface{
  id:string,
  tab:string
}


const {TabPane} = Tabs;

const EditVendor:React.FC = () =>{

  const {id,tab} = useParams<paramsInterface>();

  const dispatch = useDispatch();
  const history = useHistory();

  const state = useSelector((state:StoreInterface)=>{
    const {vendor} = state;
    return vendor;
  })
  const {vendor,fetchingVendor} = state;


  useEffect(()=>{
    dispatch(fetchVendor(id));
  },[id])// eslint-disable-line
  
  // for active tab 
  const [activeTab,setActiveTab] = useState<string>('details');

  useEffect(()=>{
    setActiveTab(tab);
  },[tab]);
  


  return(
    <div className="page-section-2">
      {fetchingVendor?<Preloader/>:
      <>
        <div className="d-flex ac">
          <h1 className="text-22-black"
          title={vendor?vendor.name:''}
          >{returnLimitedWords(vendor?vendor.name:'',25)}</h1>
          <div className="ml-auto">
            <Link to="/vendors">
              <Button shape="round" className="mr-2" type="default" htmlType="submit" size="middle">Back to vendors</Button>
            </Link>
          </div>
        </div>
        <Tabs defaultActiveKey={activeTab} 
          onChange={value=>history.push(`/vendors/${id}/${value}`)}
        >
          <TabPane key={'details'} tab="Edit details">
            <EditForm vendor={vendor}/>
          </TabPane>
          <TabPane key={'purchase-history'} tab="Purchase history">
            {vendor?
            <div className="p-1 mt-3">
              <div className="row">
                <div className="col-md-3">
                  <OverviewCard 
                    title="Total Purchases"
                    icon={IoReceipt}
                    counts={NepaliNS(vendor?.total_purchases||0,"Rs ")}
                  />
                </div>
              </div>
            </div>
            :''}
            <PurchaseInvoice vendor_id={id}/>
          </TabPane>
          <TabPane key={'payments'} tab="Payments">
              <Payments CVendor={vendor}/>
          </TabPane>
        </Tabs>
      </>
      }
    </div>
  );
}

export default EditVendor;