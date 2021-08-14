import React, { useState } from 'react';
import {Button, Popover} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { StoreInterface } from '../../store/store';
import { fetchVendors } from '../../services/vendor.service';
import Preloader from '../../components/Preloader';
import DatTableWrapper from '../../components/DataTable';
import CreateModal from './create';
import { returnLimitedWords } from '../../utils/helper.utils';
import { Link } from 'react-router-dom';

const Vendor:React.FC = () => {


  const dispatch = useDispatch();


  /**Redux store */
  const state = useSelector((state:StoreInterface)=>{
    const {vendor}  = state;
    return vendor;
  });

  const {loading,meta,vendors,}  =  state;
  /** End store */

  const loadVendors = (params:any = {page:1}) =>{
    dispatch(fetchVendors(params));
  }



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
         shape="round" size={'middle'} 
         onClick={openModal}
         className="ml-auto">
          Add Vendor
        </Button>
      </div>

      <div className="section-break-1">
        <DatTableWrapper fetchData={loadVendors} meta={meta}>
            <table className='table'>
              <thead>
                <tr>
                  <th>Pan/Vat</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
            {loading?
              <Preloader/>:
              vendors && vendors?.length?
              <tbody>
                {
                  vendors.map((vendor)=>(
                    <tr key={vendor.id}>
                      <td>{vendor.pan_vat || 'N/A'}</td>
                      <td>
                        <Popover content={
                          <div className="p-1">
                            <p><strong className="mr-1">Contact person:</strong>{vendor.contact_person || 'N/A'}</p>
                            <p><strong className="mr-1">Contact:</strong>{vendor.contact_person_number || 'N/A'}</p>
                            <h3 className="text-14px-primary mt-2">Banking Details <hr /></h3>
                            <p><strong className="mr-1">Bank name:</strong>{vendor.bank_name || 'N/A'}</p>
                            <p><strong className="mr-1">Account name:</strong>{vendor.account_name || 'N/A'}</p>
                            <p><strong className="mr-1">Account no:</strong>{vendor.account_number || 'N/A'}</p>
                          </div>
                        } title={vendor.name}>
                          {returnLimitedWords(vendor.name,30)}
                        </Popover>
                      </td>
                      <td>
                        <Popover content={vendor.email} title={false}>
                          {returnLimitedWords(vendor.email,30)}
                        </Popover>
                      </td>
                      <td>{vendor.phone || 'N/A'}</td>
                      <td>
                        <Link to={"/vendors/"+vendor.id+'/details'}>
                          <Button shape="round" className="btn-secondary mr-1">
                            View
                          </Button>
                        </Link>
                      </td>
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
        </DatTableWrapper>
      </div>
      <CreateModal closeModal={closeModal} showModal={showModal}/>
    </section>
  );
}

export default Vendor;