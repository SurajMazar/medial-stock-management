import { DeleteOutlined, FilePdfOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { deletePurchaseInvoiceService } from '../../../../services/purchase.service';
import EditPurchaseInvoice from './edit';

interface params{
  id:string
}

const ViewPurchaseInvoice:React.FC = ()=>{

  const dispatch = useDispatch();
  const {id} = useParams<params>();


  const deletePI = (id:any)=>{
    dispatch(deletePurchaseInvoiceService(id));
  }

  return(
    <section>
      <div className="section-break-2 d-flex flex-wrap ac">
        <h3 className="text-22px">Edit Purchase Invoice</h3>
        <div className="ml-auto">
          <div className="d-flex flex-wrap">
            <Link to="/purchase-invoices">
              <Button shape='round' size="middle" className="btn-outline-primary mr-2">
                List
              </Button>
            </Link>
            
            
            <Button shape='round'
            icon={<FilePdfOutlined />}
            size="middle" className="btn-outline-danger mr-2" title="Export pdf">
            </Button>

            <Button shape='round' 
            icon={<PrinterOutlined />} size="middle" title="print" className="btn-outline-success mr-2">
            </Button>

            <Popconfirm placement="leftTop" title={'Are you sure?'} onConfirm={()=>deletePI(id)} okText="delete" cancelText="cancle">
              <Button shape='round' title="delete"
              icon={<DeleteOutlined />} size="middle" className="btn-outline-danger">
              </Button>
            </Popconfirm>
          </div>
          
          
        </div>
      </div>

      <div className="section-break-1">
       <EditPurchaseInvoice/>
      </div>

    </section>
  );
}


export default ViewPurchaseInvoice;