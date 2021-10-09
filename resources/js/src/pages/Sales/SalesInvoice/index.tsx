import { EditOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DatTableWrapper from '../../../components/DataTable';
import Preloader from '../../../components/Preloader';
import { saleInvoice } from '../../../model/sales.model';
import { exportPDF } from '../../../services/export.service';
import { fetchSalesInvoice } from '../../../services/sales.service';
import { StoreInterface } from '../../../store/store';
import { getSn, NepaliNS } from '../../../utils/helper.utils';
import CreateSalesInvoice from './create';

const SalesInvoice = () => {

  const dispatch = useDispatch();

  //redux store
  const state = useSelector((state:StoreInterface)=>state);
  const {sale} = state;
  const {loadingSalesInvoices, metaSalesInvoice, salesInvoices} = sale;


  // component state
  const [showCreateModal,setShowCreateModal] = useState<boolean>(false)

  const loadSaleInvoices = (params:any = {page:1})=>{
    dispatch(fetchSalesInvoice(params));
  }

  const exportPdf = async(id:number|string,print:boolean = false)=>{
    await exportPDF('sale-invoice/export_pdf',`purchase-invoice-${id}`,id,print);
  }

  const dropdownMenu = (si:saleInvoice) => (
  <Menu>
    <Menu.Item >
      <Link to={"/sales-invoices/edit/"+si.id}>
        <Button icon={<EditOutlined/>} type="link">
          Edit
        </Button>
      </Link> 
    </Menu.Item>
    <Menu.Item>
       <Button shape='round'
        icon={<FilePdfOutlined />}
        onClick={()=>exportPdf(si.id)}
        size="middle" className="mr-1 mb-1" title="Export pdf" 
        type="link"
        >
          Export  PDF
        </Button>
      </Menu.Item>
  </Menu>)


  return (
    <section className="page-section-2">
      <div className="section-break-1-2 d-flex flex-wrap ac">
        <h3 className="text-22px">Sales Invoice</h3>
        <div className="ml-auto ">
          <Button shape="round" size="middle" type="primary"
          onClick={()=>setShowCreateModal(true)}
          >Create invoice</Button>
        </div>
      </div>

      <DatTableWrapper 
        fetchData={loadSaleInvoices} 
        meta={metaSalesInvoice} dateRange={true}
        dateRangeTitle="Transaction date">
        {
          loadingSalesInvoices?<Preloader/>:
          <table className="table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Invoice number</th>
                <th>Customer</th>
                <th>Transaction Date</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                salesInvoices && salesInvoices.length && metaSalesInvoice? (
                  <>
                  {
                    salesInvoices.map((si,i)=>(
                      <tr key={si.id}>
                        <td>{getSn(metaSalesInvoice.current_page,i+1)}</td>
                        <td>{si.invoice_number}</td>
                        <td>{si.customer?si.customer.name:si.customer_name}</td>
                        <td>{moment(si.transaction_date).format("YYYY-MM-DD")}</td>
                        <td>Rs {NepaliNS(si.amount || 0)}</td>
                        <td>
                          <Dropdown 
                            overlay={()=>dropdownMenu(si)}>
                            <Button type="link">Actions</Button>
                          </Dropdown>
                        </td>
                      </tr>
                    ))
                  }
                  </>
                )
                :(
                  <tr>
                    <td className="text-center" colSpan={6}>Sorry no sales invoices found!</td>
                  </tr>
                )
              }
            </tbody>
            </table>
          }
      </DatTableWrapper>
      <CreateSalesInvoice 
      visible={showCreateModal}
      closeModal={()=>setShowCreateModal(false)} />
    </section>
  );
}

export default SalesInvoice;
