import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Popover } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import DatTableWrapper from '../../../../components/DataTable';
import Preloader from '../../../../components/Preloader';
import Payment from '../../../../model/payment.model';
import Vendor from '../../../../model/vendors.model';
import { deletePaymentService, fetchVendor, fetchVendorPayments } from '../../../../services/vendor.service';
import { StoreInterface } from '../../../../store/store';
import { NepaliNS } from '../../../../utils/helper.utils';
import AddEditPayment from './add-edit';

interface paramInterface{
  id:string
}

interface Props{
  CVendor:Vendor|undefined
}
const Payments:React.FC<Props> = (props)=>{

  const {CVendor} = props;

  const dispatch = useDispatch();
  const {id} = useParams<paramInterface>();

  //store
  const state = useSelector((state:StoreInterface)=>state);
  const {vendor} = state;
  const {payments,metaPayments,loadingPayment} = vendor;
  
  const loadPayments = (params:any = {page:1})=>{
    params = {
      ...params,
      vendor_id:id,
    }
    dispatch(fetchVendorPayments(params));
  }



  // add edit payment modal
  const [showModal,setShowModal] = useState<boolean>(false);
  const [editPayment,setEditPayment] = useState<Payment|undefined>(undefined);
  //end add edit modal


  const handleDelete = async(payment_id:number|string)=>{
    await dispatch(deletePaymentService(payment_id));
    dispatch(fetchVendor(id));
  }

  return(
    <div className="page-section-2">
      <>
        <div className="d-flex ac">
          <h1 className="text-22-black">Payments</h1>
          <div className="ml-auto">
            <Button shape="round" 
            onClick={()=>setShowModal(true)}
            className="mr-2" type="primary" size="middle">Add Payment</Button>
          </div>
        </div>

        <div className="section-break-1">
        <DatTableWrapper fetchData={loadPayments} meta={metaPayments}>
          <div className="table-responsive">
            <table className='table'>
              <thead>
                <tr>
                  <th>Payment Type</th>
                  <th>Payment date</th>
                  <th>Paid by</th>
                  <th>Receiving Person</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
            {loadingPayment?
              <Preloader/>:
              payments && payments?.length?
              <tbody>
                {
                  payments.map((payment)=>(
                    <tr key={payment.id}>
                      <td>
                        <Popover content={
                          <div className="p-1">
                            {payment.note || "..."}
                          </div>
                        } title={"Note"}>
                          {payment.payment_type}
                        </Popover>
                      </td>
                      <td>
                        {moment(payment.payment_date).format("YYYY-MM-DD")}
                      </td>
                      <td>
                        {payment.paid_by}
                      </td>
                      <td>{payment.receiving_person}</td>
                      <td>Rs {NepaliNS(payment.paid_amount)}</td>
                      <td>
                        <div className="d-flex">
                          <Button shape="round" className="btn-secondary mr-1" onClick={()=>{
                            setEditPayment(payment)
                            setShowModal(true);
                          }} size='middle' icon={<EditOutlined/>}>
                          </Button>

                          <Popconfirm title="Are you sure?" 
                            onConfirm={()=>handleDelete(payment.id)}
                            cancelText="cancle" okText="delete"
                            >
                            <Button shape="round" 
                              className="btn-secondary" size='middle' icon={<DeleteOutlined/>}>
                            </Button>
                          </Popconfirm>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>:
              <tbody>
                <tr>
                  <td colSpan={6} className="text-center">Sorry no payments found!</td>
                </tr>
              </tbody>
              } 
            </table>
          </div>
        </DatTableWrapper>
      </div>
      <AddEditPayment 
      visible={showModal} 
      editData={editPayment} 
      closeModal={()=>{
        setShowModal(false);
        setEditPayment(undefined);
      }}
      vendor={CVendor}
      />
      </>
    </div>
  );
}


export default Payments;