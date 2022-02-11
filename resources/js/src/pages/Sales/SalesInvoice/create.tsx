import { Button, Checkbox, DatePicker, Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomSelect from '../../../components/DataTable/select'
import { fetchCustomerService } from '../../../services/customer.service'
import { StoreInterface } from '../../../store/store'
import { removeNullItems, setFormdata } from '../../../utils/helper.utils'
import {CreateSalesInvoiceService} from '../../../services/sales.service'

interface CreateSIprops {
  visible: boolean,
  closeModal: () => void
}

const CreateSalesInvoice: React.FC<CreateSIprops> = (props) => {

  //props
  const { closeModal, visible } = props

  const [form] = Form.useForm()

  const dispatch = useDispatch();

  //redux state
  const state = useSelector((state: StoreInterface) => state);
  const { loading: loadingCustomer, customers } = state.customer;

  //component state
  const [existingCustomer, setExistingCustomer] = useState<boolean>(false);
  const [creating,setCreating] = useState<boolean>(false)

  const loadCustomers = (params: any = { page: 1 }) => {
    dispatch(fetchCustomerService(params));
  }

  const handleModalClose = () => {
    form.resetFields()
    closeModal()
  }

  const handleSubmit = (values:any)=>{
    values = setFormdata(removeNullItems({
      ...values,
      // user_id:userId
    }))
    setCreating(true)
    dispatch(CreateSalesInvoiceService(values,()=>setCreating(false)));
  }


  return (
    <Modal
      visible={visible}
      onCancel={handleModalClose}
      title="Create sale invoice"
      footer={[
        <div key='1' className="d-flex flex-wrap">
          <Button
            htmlType="submit"
            type="primary"
            shape="round"
            form="create-sales-invoice-form"
            className="mr-2"
            loading={creating}
          >Create</Button>
          <Button htmlType="button"
            onClick={handleModalClose}
            type="link"
          >
            Cancle
          </Button>
        </div>
      ]}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={handleSubmit}
        id="create-sales-invoice-form">
        <div className="row">
          {/* <div className="col-md-12">
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
          </div> */}

          <div className="col-md-12">
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

          <div className="col-md-12 mb-4">
            <Checkbox checked={existingCustomer} onChange={
              (e) => setExistingCustomer(e.target.checked)}
              children={"Existing Customer?"}
            />
          </div>


          {
            existingCustomer ?
              <div className="col-md-12">
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
              <div className="col-md-12">
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
        </div>
      </Form>
    </Modal>
  );
}

export default CreateSalesInvoice
