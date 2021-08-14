import { DeleteOutlined, FilePdfOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { exportPDF } from '../../../../services/export.service';
import { deletePurchaseInvoiceService } from '../../../../services/purchase.service';
import EditPurchaseInvoice from './edit';

interface params{
  id:string
}

const ViewPurchaseInvoice:React.FC = ()=>{

  const dispatch = useDispatch();
  const {id} = useParams<params>();

  const [loadingPdf,setLoadingPdf] = useState<boolean>(false);
  const [loadingPrint,setLoadingPrint] = useState<boolean>(false);

  const deletePI = (id:any)=>{
    dispatch(deletePurchaseInvoiceService(id));
  }

  const exportPdf = async(print:boolean = false)=>{
    if(print){
      setLoadingPrint(true);
    }else{
      setLoadingPdf(true)
    }
    await exportPDF('purchase_invoice/export_pdf',`purchase-invoice-${id}`,id,print);
    setLoadingPrint(false);
    setLoadingPdf(false)
  }

  return(
    <section>
      <div className="section-break-2 d-flex flex-wrap ac">
        <h3 className="text-22px">Edit Purchase Invoice</h3>
        <div className="ml-auto">
          <div className="d-flex flex-wrap">
            <Link to="/purchase-invoices">
              <Button shape='round' size="middle" className="mr-2">
                List
              </Button>
            </Link>
            
            
            <Button shape='round'
            icon={<FilePdfOutlined />}
            onClick={()=>exportPdf()}
            loading={loadingPdf}
            size="middle" className="mr-2" title="Export pdf" type="primary">
            </Button>

            <Button shape='round' 
            onClick={()=>exportPdf(true)}
            loading={loadingPrint}
            icon={<PrinterOutlined />} size="middle" title="print" className="mr-2" type="default">
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