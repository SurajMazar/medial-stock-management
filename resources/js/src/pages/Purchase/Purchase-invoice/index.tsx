import { Button } from 'antd';
import React, { useState } from 'react';
import CreatePurchaseInvoice from './create';


const PurchaseInvoice:React.FC = () =>{


  const [showModal,setShowModal] = useState<boolean>(false);
  


  return(
    <section>
      <div className="section-break-1-2 d-flex ac">
        <h3 className="text-22px">Purchase Invoice</h3>
        <div className="ml-auto">
          <Button shape="round" size="middle" type="primary"
          onClick={()=>setShowModal(true)}>Create invoice</Button>
        </div>
      </div>

      <div className="section-break-2">
        <table className="table">
          <thead>
            <tr>
              <th>sn</th>
              <th>Invoice no</th>
              <th>Vendor</th>
              <th>Currency</th>
              <th>Transaction date</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <CreatePurchaseInvoice closeModal={()=>setShowModal(false)} visible={showModal}/>
    </section>
  );
}

export default PurchaseInvoice;