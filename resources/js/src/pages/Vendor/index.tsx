import React, { useEffect, useState } from 'react';
import {Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { StoreInterface } from '../../store/store';
import { fetchVendors } from '../../services/vendor.service';
import Preloader from '../../components/Preloader';
import DatTableWrapper from '../../components/DataTable';

const Vendor:React.FC = () => {


  const dispatch = useDispatch();


  /**Redux store */
  const state = useSelector((state:StoreInterface)=>{
    const {vendor}  = state;
    return vendor;
  });

  const {loading,meta,vendors}  =  state;
  /** End store */

  const loadVendors = (params:any = {page:1}) =>{
    dispatch(fetchVendors(params));
  }


  useEffect(()=>{
    loadVendors();
  },[dispatch]) //eslint-disable-line





  return(
    <section>

      <div className="section-break-2 d-flex ac">
        <h3 className="text-24px-black">Vendors</h3>
        <Button type="primary" shape="round" size={'large'} className="ml-auto">
          Add Vendor
        </Button>
      </div>

      <div className="section-break-1">
        <DatTableWrapper fetchData={loadVendors}>
          <div className="p-1 table-responsive">
            <table className='table'>
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
            {loading?
              <Preloader/>:
              vendors && vendors?.length?
              <tbody>
                {
                  vendors.map((vendor,index)=>(
                    <tr key={vendor.id}>
                      <td>{index+1}</td>
                      <td>{vendor.name}</td>
                      <td>{vendor.email}</td>
                      <td>{vendor.phone}</td>
                      <td>{vendor.address}</td>
                      <td></td>
                    </tr>
                  ))
                }
              </tbody>:
              <tbody>
                <tr>
                  <td colSpan={6} className="text-center">Sorry no vendors found!</td>
                </tr>
              </tbody>
              } 
            </table>
          </div>
        </DatTableWrapper>
      </div>
    </section>
  );
}

export default Vendor;