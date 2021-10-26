import { DeleteOutlined, EyeOutlined, FilePdfOutlined, } from '@ant-design/icons';
import { Button, Menu, Popconfirm, Dropdown} from 'antd';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DatTableWrapper from '../../../components/DataTable';
import Preloader from '../../../components/Preloader';
import { exportPDF } from '../../../services/export.service';
import { deleteLabInvoice, fetchLabInvoices } from '../../../services/labTests.service';
import { StoreInterface } from '../../../store/store';
import { getSn, NepaliNS } from '../../../utils/helper.utils';

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


  const deleteLi = async (id:number|string) =>{
    await deleteLabInvoice(id)
    loadLabInvoices()
  }


  const exportInvoicePdf = async(id:number|string,print:boolean = false)=>{
    await exportPDF('lab-invoices/export_pdf',`lab-invoice-${id}`,id,print);
  }

  const exportReportPdf = async(id:number|string,print:boolean = false)=>{
    await exportPDF('lab-invoices/export_pdf_report',`lab-report-${id}`,id,print);
  }

  const dropdownMenu = (pi:any) =>(
    <Menu>
      <Menu.Item>
        <Link to={`/lab-invoices/edit/${pi.id}`}>
          <Button icon={<EyeOutlined />}
          shape="round" title="view" size="middle" className="mr-1 mb-1"
          type="link">
            View
          </Button>
        </Link>
      </Menu.Item>

      <Menu.Item>
       <Button shape='round'
        icon={<FilePdfOutlined />}
        onClick={()=>exportInvoicePdf(pi.id)}
        size="middle" className="mr-1 mb-1" title="Export invoice" 
        type="link"
        >
          Export  invoice
        </Button>
      </Menu.Item>

      <Menu.Item>
        <Button shape='round' 
        onClick={()=>exportReportPdf(pi.id)}
        icon={<FilePdfOutlined />} size="middle" title="Export report" className="mr-1 mb-1" type="link">
          Export report
        </Button>
      </Menu.Item>

      <Menu.Item>
        <Popconfirm
          title={"Are you sure?"}
          onConfirm={()=>deleteLi(pi.id)}
          okText="delete"
          cancelText="cancle"
        >
          <Button title="delete" 
          type="link"
          size="middle" className="mr-1 mb-1"
          icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  )

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
                  <th>Amount</th>
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
                    <td>{moment(li.invoice_date).format("YYYY-MM-DD")}</td>
                    <td>{li.customer?li.customer.name:li.customer_name}</td>
                    <td>Rs {NepaliNS(li.amount)}</td>
                    <td>
                      <Dropdown overlay={()=>dropdownMenu(li)} placement="bottomCenter">
                        <Button type="link">Actions</Button>
                      </Dropdown> 
                    </td>
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
