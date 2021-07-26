import { Button, Checkbox, Form, Input, Modal, DatePicker } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomSelect from '../../../components/DataTable/select';
import { fetchCurrencies } from '../../../services/currency.service';
import { createPurchaseInvoice } from '../../../services/purchase.service';
import { fetchVendors } from '../../../services/vendor.service';
import { StoreInterface } from '../../../store/store';
import { removeNullItems, setFormdata } from '../../../utils/helper.utils';

interface Props{
  visible:boolean,
  closeModal:()=>void,
  vendor_id?:string
}

const CreatePurchaseInvoice:React.FC<Props> = (props)=>{

  const {closeModal,visible,vendor_id} = props;

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleClose = ()=>{
    form.resetFields();
    closeModal();
  }

  //redux store
  const state = useSelector((state:StoreInterface)=>{
    return state;
  })
  const {vendor,currency} = state;
  const loadVendors = (params:any)=>{
    dispatch(fetchVendors(params));
  }
  const loadCurrency = (params:any)=>{
    dispatch(fetchCurrencies(params));
  }
  //redux store

  const [creating,setCreating] = useState<boolean>(false)
  const createPI = async(values:any) =>{
    setCreating(true);
    if(vendor_id){
      values.vendor_id = vendor_id;
    }
    const form = setFormdata(removeNullItems(values));
    await dispatch(createPurchaseInvoice(form));
    setCreating(false);
  }

  const [foreignCurrency,setForeignCurrency] = useState<boolean>(false)

  return (
    <Modal
      visible={visible}
      onCancel={handleClose}
      title="Create Purchase Invoice"
      footer={
        [
          <Button shape="round" size="middle" key={2}
            form="create-purchase-invoice-id-form" htmlType="submit"
            type="primary" loading={creating}>
            Create
          </Button>
        ]
      }
    >
      <Form
        id="create-purchase-invoice-id-form"
        form={form}
        layout="vertical"
        onFinish={createPI}
        >
        <div className="row">

          <div className="col-md-12">
            <Form.Item
            label="Invoice number"
            name="invoice_number"
            rules={
              [{required:true,message:'Invoice number is required!'}]
            }
            >
              <Input className="form-control" placeholder="Invoice no."/>
            </Form.Item>
          </div>
          {
            vendor_id?"":
            <div className="col-md-12">
              <CustomSelect
                label="Vendor"
                name="vendor_id"
                loading={vendor.loading}
                options={vendor.vendors||[]}
                placeholder="Select vendor"
                required={true}
                search={loadVendors} 
              />
            </div>
          }

          <div className="col-md-12 mb-4">
            <Checkbox checked={foreignCurrency} onChange={
              (e)=>{
                if(e.target.checked){
                  setForeignCurrency(true);
                }else{
                  setForeignCurrency(false);
                }
              }
            }>
              foreign currency?
            </Checkbox>
          </div>

            {
              foreignCurrency?
              <div className="col-md-12">
                <CustomSelect
                  label="Currency"
                  name="currency_id"
                  loading={currency.loading}
                  options={currency.currencies||[]}
                  placeholder="Select currency"
                  required={true}
                  search={loadCurrency} 
                  displayValue={["country","name","symbol"]}
                />
              </div>:''
            }

          <div className="col-md-6">
            <Form.Item
            label="Transaction date"
            name="transaction_date"
            rules={
              [{required:true,message:'Transaction date is required!'}]
            }
            >
              <DatePicker  placeholder="Transaction date" className="form-control"/>
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
            label="Invoice date"
            name="invoice_issue_date"
            rules={
              [{required:true,message:'Invoice date is required!'}]
            }
            >
              <DatePicker placeholder="Invoice date " className="form-control"/>
            </Form.Item>
          </div>
        </div>
       

      </Form>
    </Modal>
  );
}

export default CreatePurchaseInvoice;