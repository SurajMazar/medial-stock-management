import { Button } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DatTableWrapper from '../../../components/DataTable';
import Preloader from '../../../components/Preloader';
import { fetchLabInvoices } from '../../../services/labTests.service';
import { StoreInterface } from '../../../store/store';
import { getSn } from '../../../utils/helper.utils';

const LabInvoice = () => {

  const dispatch = useDispatch();

  /** redux state */
  const state = useSelector((state:StoreInterface)=>state);
  const {labTests} = state;
  const {loadingLI,labInvoices,metaLI} = labTests;


  /**
   * fetch lab Invoices
   */
  const loadLabInvoices = (params:any = {page:1}) =>{
    dispatch(fetchLabInvoices(params));
  }

  return (
    <section className="page-section-2">
      
      <div className="d-flex ac">
        <h3 className="text-22">Lab Invoices</h3>
        <div className="ml-auto">
          <Link to="/lab-invoices/add"><Button shape="round" type="primary" size="middle">Create Lab Invoice</Button></Link>
        </div>
      </div>

      <div className="section-break-1">
        <DatTableWrapper meta={metaLI} fetchData={loadLabInvoices}>
          {
            loadingLI?<Preloader/>:
            <table className="table">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Invoice Number</th>
                  <th>Invoice date</th>
                  <th>Customer</th>
                  <th>Actions</th>
                 
                </tr>
              </thead>

              <tbody>
              {
                labInvoices && labInvoices.length && metaLI?
                labInvoices.map((li,i)=>(
                  <tr key={i}>
                    <td>{getSn(metaLI?.current_page,i)}</td>
                    <td>{li.invoice_number}</td>
                    <td>{li.customer?li.customer.name:li.customer_name}</td>
                    <td></td>
                  </tr>
                )):
                <tr>
                  <td className="text-center" colSpan={5}>Sorry no Lab Invoices found!</td>
                </tr>
              }
              </tbody>
            </table>
          }
        </DatTableWrapper>
      </div>

    </section>
  );
}

export default LabInvoice;
