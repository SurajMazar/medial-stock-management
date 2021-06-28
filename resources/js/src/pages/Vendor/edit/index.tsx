import { Button, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Preloader from '../../../components/Preloader';
import { fetchVendor } from '../../../services/vendor.service';
import { StoreInterface } from '../../../store/store';
import EditForm from './edit';


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
          <h1 className="text-22-black">Vendor Details</h1>
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

          </TabPane>
          <TabPane key={'payments'} tab="Payments">

          </TabPane>
        </Tabs>
      </>
      }
    </div>
  );
}

export default EditVendor;