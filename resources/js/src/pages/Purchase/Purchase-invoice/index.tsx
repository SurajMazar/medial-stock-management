import { Button } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DatTableWrapper from '../../../components/DataTable';
import Preloader from '../../../components/Preloader';
import { fetchPurchaseInvoice } from '../../../services/purchase.service';
import { StoreInterface } from '../../../store/store';
import { getSn } from '../../../utils/helper.utils';
import CreatePurchaseInvoice from './create';


const PurchaseInvoice:React.FC = () =>{


  const [showModal,setShowModal] = useState<boolean>(false);
  
  const dispatch = useDispatch();

  //store
  const state = useSelector((state:StoreInterface)=>{
    const {purchase} = state;
    return purchase;
  })
  const {PurchaseInvoices,
    metaPurchaseInvoice,
    loadingPurchaseInvoice} = state;

    const loadPurchaseInvoice = (params:any) =>{
      dispatch(fetchPurchaseInvoice(params));
    }
  //store

  return(
    <section>
      <div className="section-break-1-2 d-flex ac">
        <h3 className="text-22px">Purchase Invoice</h3>
        <div className="ml-auto">
          <Button shape="round" size="middle" type="primary"
          onClick={()=>setShowModal(true)}>Create invoice</Button>
        </div>
      </div>
      <DatTableWrapper fetchData={loadPurchaseInvoice} meta={metaPurchaseInvoice}>
        <div className="section-break-2">
          {loadingPurchaseInvoice?<Preloader/>:
          <table className="table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Invoice no</th>
                <th>Vendor</th>
                <th>Currency</th>
                <th>Transaction date</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                PurchaseInvoices && PurchaseInvoices.length && metaPurchaseInvoice?
                PurchaseInvoices.map((pi,i)=>(
                  <tr key={pi.id}>
                    <td>{getSn(metaPurchaseInvoice.current_page,i)}</td>
                    <td>{pi.invoice_number}</td>
                    <td>{ pi.vendor.name || 'N/A'}</td>
                    <td>{ pi.currency? `${pi.currency.country}(${pi.currency.symbol})`:'Nep(Rs)'}</td>
                    <td>{moment(pi.transaction_date).format("YYYY-MM-DD")}</td>
                    <td>Rs.{pi.total || 0}</td>
                    <td>
                      <Link to={`/purchase-invoices/view/${pi.id}`}>
                        <Button shape="round" size="middle" className="btn-outline-primary">
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
                :
              <tr>
                <td colSpan={7} className="text-center">Sorry no purchase invoices found!!</td>
              </tr>
              }
              
            </tbody>
          </table>
          }
        </div>
      </DatTableWrapper>
      
      <CreatePurchaseInvoice closeModal={()=>setShowModal(false)} visible={showModal}/>
    </section>
  );
}

export default PurchaseInvoice;