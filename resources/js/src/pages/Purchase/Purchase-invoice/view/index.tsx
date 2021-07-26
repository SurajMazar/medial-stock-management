import { FilePdfOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import EditPurchaseInvoice from './edit';



const ViewPurchaseInvoice:React.FC = ()=>{
  return(
    <section>
      <div className="section-break-2 d-flex ac">
        <h3 className="text-22px">Edit Purchase Invoice</h3>
        <div className="ml-auto">
          <div className="d-flex">
            <Link to="/purchase-invoices">
              <Button shape='round' size="middle" className="btn-outline-primary mr-2">
                List
              </Button>
            </Link>
            
            
            <Button shape='round'
            icon={<FilePdfOutlined />}
            size="middle" className="btn-outline-danger mr-2">
              Export as pdf
            </Button>

            <Button shape='round' 
            icon={<PrinterOutlined />} size="middle" className="btn-outline-success">
              Print
            </Button>
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