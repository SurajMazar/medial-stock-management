import React, { useEffect, useState } from 'react';
import { Button, Checkbox, DatePicker, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { StoreInterface } from '../../../../store/store';
import { fetchCustomerService } from '../../../../services/customer.service';
import CustomSelect from '../../../../components/DataTable/select';
import { useParams } from 'react-router';
import { fetchSalesInvoiceByID } from '../../../../services/sales.service';
import Preloader from '../../../../components/Preloader';
import moment from 'moment';
import SalesInSalesInvoice from './sales';
import AddEditSale from './add-edit-sale';
import { FilePdfOutlined } from '@ant-design/icons';
import { exportPDF } from '../../../../services/export.service';

interface Params{
  id:string
}

const CreateEditSalesInvoice: React.FC = () => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {id} = useParams<Params>();

  //redux state
  const state = useSelector((state: StoreInterface) => state);
  const {loadingSalesInvoices,sales,currentSaleInvoice} = state.sale
  const { loading: loadingCustomer, customers } = state.customer;

  //component state
  const [existingCustomer, setExistingCustomer] = useState<boolean>(false);
  const [showAddItem,setShowAddItem] = useState(false) 
  const [loadingPdf,setLoadingPdf] = useState<boolean>(false);

  const loadCustomers = (params: any = { page: 1 }) => {
    dispatch(fetchCustomerService(params));
  }

  // load edit data
  const loadSIbyId = () =>{
    dispatch(fetchSalesInvoiceByID(id));
  }

  useEffect(()=>{
    if(id) loadSIbyId()
  },[id])


  useEffect(()=>{
    if(currentSaleInvoice){
      if(currentSaleInvoice.customer_id) {setExistingCustomer(true)}
      form.setFieldsValue({
        ...currentSaleInvoice,
        transaction_date:moment(currentSaleInvoice.transaction_date),
      })
    }
  },[currentSaleInvoice])


  const exportPdf = async(print:boolean = false)=>{
    setLoadingPdf(true)
    await exportPDF('sale-invoice/export_pdf',`purchase-invoice-${id}`,id,print);
    setLoadingPdf(false)
  }

  return (
    <>
      <section>
        <div className="section-break-2 d-flex flex-wrap ac">
          <h3 className="text-22px">Edit sales invoice</h3>
          <div className="ml-auto">
            <Button shape='round' 
              onClick={()=>exportPdf(false)}
              loading={loadingPdf}
              icon={<FilePdfOutlined />} size="middle" title="Export pdf" className="mr-2" type="primary">
                Export PDF
              </Button>
          </div>
        </div>
        {
          loadingSalesInvoices?<Preloader/>:
          <Form
            layout='vertical'
            form={form}
            onFinish={(value) => console.log(value)}
            className="floating-button-wrapper"
          >
            <div className="row">
              <div className="col-md-6">
                <Form.Item
                  label="Invoice number"
                  name="invoice_number"
                  rules={
                    [
                      {
                        required: true, message: 'This field is required!'
                      }
                    ]
                  }
                >
                  <Input placeholder="Invoice number" className="form-control" />
                </Form.Item>
              </div>

              <div className="col-md-6">
                <Form.Item
                  label="Transaction date"
                  name="transaction_date"
                  rules={
                    [
                      {
                        required: true, message: 'This field is required!'
                      }
                    ]
                  }
                >
                  <DatePicker placeholder="Transaction date" className="form-control" />
                </Form.Item>
              </div>

              <div className="col-md-3 mb-4">
                <Checkbox checked={existingCustomer} onChange={
                  (e) => setExistingCustomer(e.target.checked)}
                  children={"Existing Customer?"}
                />
              </div>


              {
                existingCustomer ?
                  <div className="col-md-3">
                    <CustomSelect
                      label="Customer"
                      name="customer_id"
                      loading={loadingCustomer}
                      options={customers || []}
                      placeholder="Select customer"
                      search={loadCustomers}
                      required={true}
                    />
                  </div> :
                  <div className="col-md-3">
                    <Form.Item
                      label="Customer name"
                      name="customer_name"
                      rules={
                        [
                          {
                            required: true, message: 'This field is required!'
                          }
                        ]
                      }
                    >
                      <Input className="form-control" placeholder="Customer name" />
                    </Form.Item>
                  </div>
              }

              <div className="col-md-6">
                <Form.Item
                  label="Note"
                  name="note"
                >
                  <Input.TextArea className="form-control" placeholder="Note" />
                </Form.Item>
              </div>

            </div>

            <SalesInSalesInvoice 
            openModel={()=>{setShowAddItem(true)}}
            sales={sales} form={form} alterations={currentSaleInvoice?.alterations}/>

          </Form>
        }
        <AddEditSale 
        visible={showAddItem}
        closeModal={()=>{
          setShowAddItem(false)
        }}/>
      </section>
    </>
  )
}


export default CreateEditSalesInvoice;