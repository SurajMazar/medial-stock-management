import React, { useEffect, useState } from 'react';
import {Button, Popover} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { StoreInterface } from '../../store/store';
import { fetchVendors } from '../../services/vendor.service';
import Preloader from '../../components/Preloader';
import DatTableWrapper from '../../components/DataTable';
import CreateModal from './create';
import { returnLimitedWords } from '../../utils/helper.utils';

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


  //modal related
  const [showModal,setShowModal] = useState<boolean>(false);
  const openModal = ()=>{
    setShowModal(true);
  }
  const closeModal = ()=>{
    setShowModal(false);
  }
  //end modal


  return(
    <section>

      <div className="section-break-2 d-flex ac">
        <h3 className="text-24px-black">Vendors</h3>
        <Button type="primary"
         shape="round" size={'large'} 
         onClick={openModal}
         className="ml-auto">
          Add Vendor
        </Button>
      </div>

      <div className="section-break-1">
        <DatTableWrapper fetchData={loadVendors} meta={meta}>
          <div className="p-1 table-responsive">
            <table className='table'>
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th title="Contact person">C.person</th>
                  <th>Pan/Vat</th>
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
                      <td>
                        <Popover content={vendor.name} title={false}>
                          {returnLimitedWords(vendor.name,20)}
                        </Popover>
                      </td>
                      <td>
                        <Popover content={vendor.email} title={false}>
                          {returnLimitedWords(vendor.email,20)}
                        </Popover>
                      </td>
                      <td>{vendor.phone || 'N/A'}</td>
                      <td>{vendor.contact_person || 'N/A'}</td>
                      <td>{vendor.pan_vat || 'N/A'}</td>
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
      <CreateModal closeModal={closeModal} showModal={showModal}/>
    </section>
  );
}

export default Vendor;