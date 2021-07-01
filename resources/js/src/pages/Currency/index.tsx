import { Button } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatTableWrapper from '../../components/DataTable';
import Preloader from '../../components/Preloader';
import Currency from '../../model/currency.model';
import { fetchCurrencies } from '../../services/currency.service';
import {StoreInterface} from '../../store/store';
import { getSn } from '../../utils/helper.utils';
import CreateEditCurrency from './create-edit';

const Currency:React.FC = () =>{

  //store
  const dispatch = useDispatch();
  const state =  useSelector((state:StoreInterface)=>{
    const {currency} = state;
    return currency;
  });
  const {
    currencies,
    meta,
    loading
  } = state;
  //end store


  const loadCurrency = (params:any) =>{
    dispatch(fetchCurrencies(params));
  }


  // create edit modal related
  const [showModal,setShowModal] =  React.useState<boolean>(false);
  const [editData,setEditData] = React.useState<Currency|undefined>(undefined);

  const openModal = () =>{
    setShowModal(true);
  }

  const closeModal = () =>{
    setShowModal(false);
    setEditData(undefined);
  }

  const openEditModal = (data:Currency) =>{
    setEditData(data);
    setShowModal(true);
  }
  // end create edit modal related

  return(
    <section>
      <div className="section-break-1-2 d-flex">
        <h2 className="text-22px">Currency</h2>
        <div className="ml-auto">
          <Button shape="round" onClick={openModal} size="middle" type="primary">Add Currency</Button>
        </div>
      </div>

      <div className="section-break-1">
        <DatTableWrapper fetchData={loadCurrency} meta={meta}>
          {
            loading?<Preloader/>:
            <table className="table">
              <thead>
                <tr>
                  <th>Sn</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Symbol</th>
                  <th>Local Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currencies && currencies.length && meta?
                currencies.map((currency,index)=>(
                  <tr>
                    <td>{getSn(meta?.current_page,index)}</td>
                    <td>{currency.name}</td>
                    <td>{currency.country}</td>
                    <td>{currency.symbol}</td>
                    <td>रू(Rs). {currency.local_value}</td>
                    <td>
                      <Button shape="round" 
                        onClick={()=>openEditModal(currency)}
                      size="middle" className="btn-secondary">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
                :<tr>
                  <td colSpan={6} className="text-center">Sorry no currencies found!</td>
                </tr>}
              </tbody>
            </table>
          }
        
        </DatTableWrapper>
      </div>
      <CreateEditCurrency visible={showModal}
        closeModal={closeModal}
        editData={editData}
      />
    </section>
  )
}


export default Currency;