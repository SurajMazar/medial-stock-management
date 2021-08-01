import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Popover } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DatTableWrapper from '../../../components/DataTable';
import Preloader from '../../../components/Preloader';
import { deletePurchaseInvoiceService, fetchPurchaseInvoice } from '../../../services/purchase.service';
import { StoreInterface } from '../../../store/store';
import { getSn, returnLimitedWords } from '../../../utils/helper.utils';
import CreatePurchaseInvoice from './create';

interface PIprops{
  vendor_id?:string
}

const PurchaseInvoice:React.FC<PIprops> = ({vendor_id}) =>{


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
      if(vendor_id){
        params = {
          ...params,
          vendor:vendor_id
        }
      }
      dispatch(fetchPurchaseInvoice(params));
    }


    const deletePI = (id:any)=>{
      dispatch(deletePurchaseInvoiceService(id));
    }
  //store

  return(
    <section>
      <div className="section-break-1-2 d-flex flex-wrap ac">
        {vendor_id?"":<h3 className="text-22px">Purchase Invoice</h3>}
        <div className="ml-auto ">
          <Button shape="round" size="middle" type="primary"
          onClick={()=>setShowModal(true)}>Create invoice</Button>
        </div>
      </div>
      <DatTableWrapper dateRange={true} dateRangeTitle={"transaction date"} fetchData={loadPurchaseInvoice} meta={metaPurchaseInvoice}>
        <div className="section-break-2">
          {loadingPurchaseInvoice?<Preloader/>:
          <table className="table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Invoice no</th>
                {vendor_id?null:<th>Vendor</th>}
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
                    {vendor_id?null:<td>
                      <Link to={`/vendors/${pi.vendor.id}/purchase-history`}>{ returnLimitedWords(pi.vendor.name||"",25) || 'N/A'}</Link></td>}
                    <td>{ pi.currency? `${pi.currency.country}(${pi.currency.symbol})`:'Nep(Rs)'}</td>
                    <td>{moment(pi.transaction_date).format("YYYY-MM-DD")}</td>
                    <td>Rs.{pi.total || 0}</td>
                    <td>
                      <div className="d-flex">
                        <Link to={`/purchase-invoices/view/${pi.id}`}>
                          <Button icon={<EyeOutlined />}
                          shape="round" title="view" size="middle" className="btn-outline-primary mr-1 mb-1">
                          </Button>
                        </Link>
                        <Popconfirm
                          title={"Are you sure?"}
                          onConfirm={()=>deletePI(pi.id)}
                          okText="delete"
                          cancelText="cancle"
                        >
                          <Button shape="round" title="delete" size="middle" className="btn-outline-danger"
                          icon={<DeleteOutlined />}
                          >
                          </Button>
                        </Popconfirm>
                      </div>
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
      <CreatePurchaseInvoice closeModal={()=>setShowModal(false)} visible={showModal} vendor_id={vendor_id}/>
    </section>
  );
}

export default PurchaseInvoice;