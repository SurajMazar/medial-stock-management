import {Modal,Form, Button, Input, DatePicker, Select} from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CustomSelect from '../../../../components/DataTable/select';
import { purchase } from '../../../../model/purchase.model';
import { fetchProducts } from '../../../../services/product.service';
import { createPurchase, fetchSinglePurchaseInvoice } from '../../../../services/purchase.service';
import { StoreInterface } from '../../../../store/store';
import { setFormdata } from '../../../../utils/helper.utils';

interface Props{
  visible:boolean,
  closeModal:()=>void,
  editData?:purchase|undefined
}

interface params{
  id:string
}

const CreateEditPurchase:React.FC<Props> = (props) =>{

  const {
    closeModal,
    editData,
    visible,
  } = props;


  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {id} = useParams<params>();

  //store
  const store = useSelector((state:StoreInterface)=>state);
  const {product} = store;

  const loadProduct = (params:any)=>{
    dispatch(fetchProducts(params));
  }



  //close modal
  const handleClose = ()=>{
    form.resetFields();
    closeModal();
  }

  // free
  const [free,setFree] = useState<boolean>(false);
  const calculateTotal = (value:any) =>{
    const {free_rate_type,rate,free_rate,quantity} = value;
    if(free){
      if( free_rate_type === 'percent'){
        let amount = (free_rate/100)*rate;
        return amount*quantity;
      }else{
        return (rate - free_rate)*quantity;
      }
    }else{
      return rate * quantity;
    }
  }

  //additem
  const handleAdd = (value:any) =>{
    const total = calculateTotal(value).toFixed(2);
    const formData = setFormdata({
      ...value,
      free:free,
      amount:total,
      purchase_invoice_id:id
    });
    dispatch(createPurchase(formData,closeModal));
  }

  return(
    <Modal
      visible={visible}
      onCancel={handleClose}
      title={editData?"Edit product":"Add product"}
      footer={
        [
          <Button key={1} size="middle" shape="round" type="primary" htmlType="submit"
          form={'create-edit-purchase-product'}>
            {editData?'Update':"Add"}
          </Button>
        ]
      }
    >
      <Form
        form={form}
        id="create-edit-purchase-product"
        layout="vertical"
        onFinish={handleAdd}
      >
        <div className="row">
          <div className="col-md-12">
            <Form.Item
            label="Code"
            name="code"
            rules={
              [
                {required:true,message:'This field is required !'}
              ]
            }
            >
              <Input placeholder="code" className="form-control"/>
            </Form.Item>
          </div>

          <div className="col-md-12">
            <CustomSelect
              label="Product"
              name="product_id"
              options={product.products || []}
              loading={product.loading}
              placeholder="Select product"
              required={true}
              search={loadProduct}
            />
          </div>

          <div className="col-md-12">
            <Form.Item
            label="Pack"
            name="pack"
            rules={
              [
                {required:true,message:'This field is required !'}
              ]
            }
            >
              <Input type="text" placeholder="Pack" className="form-control"/>
            </Form.Item>
          </div>

          <div className="col-md-12">
            <Form.Item
            label="Quantity"
            name="quantity"
            rules={
              [
                {required:true,message:'This field is required !'}
              ]
            }
            >
              <Input type="number" placeholder="Quantity" className="form-control"/>
            </Form.Item>
          </div>


          <div className="col-md-12">
            <Form.Item
            label="Batch"
            name="batch"
            rules={
              [
                {required:true,message:'This field is required !'}
              ]
            }
            >
              <Input type="text" placeholder="Batch" className="form-control"/>
            </Form.Item>
          </div>

          <div className="col-md-12">
            <Form.Item
            label="Expiry date"
            name="expiry_date"
            rules={
              [{required:true,message:'This field is required !'}]
            }
            >
              <DatePicker placeholder="Expiry date " className="form-control"/>
            </Form.Item>
          </div>

          <div className="col-md-12 mb-4">
            <Checkbox checked={free} onChange={
              (e)=>{
                if(e.target.checked){
                  setFree(true);
                }else{
                  setFree(false);
                }
              }
            }>
              free?
            </Checkbox>
          </div>

          {
            free?
            <>
            <div className="col-md-12">
              <Form.Item
                label="Free rate type"
                name="free_rate_type"
                rules={
                  [{required:true,message:'This field is required !'}]
                }
              >
                <Select placeholder="free rate type">
                  <Select.Option value="percent">Percent</Select.Option>
                  <Select.Option value="amount">Amount</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Free rate"
                name="free_rate"
                rules={
                  [{
                    required:true,
                    pattern:new RegExp(/[+-]?([0-9]*[.])?[0-9]+/),
                    message:'This field is required and must be a number or float'
                  }]
                }
              >
                <Input type="number" placeholder="Free rate" className="form-control"/>
              </Form.Item>
              <p className='text-text-11px-black'>
                Free rate will be treated as percent or amount depending upon free rate type!
              </p>
            </div>
            </>:""
          }
          <div className="col-md-12">
            <Form.Item
              label="Rate"
              name="rate"
              rules={
                [{
                  required:true,
                  pattern:new RegExp(/[+-]?([0-9]*[.])?[0-9]+/),
                  message:'This field is required and must be a number or float'
                }]
              }
            >
              <Input  placeholder="Rate" className="form-control"/>
            </Form.Item>
          </div>

           <div className="col-md-12">
              <Form.Item
                label="Marked price"
                name="marked_price"
                rules={
                  [{
                    required:true,
                    pattern:new RegExp(/[+-]?([0-9]*[.])?[0-9]+/),
                    message:'This field is required and must be a number or float'
                  }]
                }
              >
                <Input  placeholder="Marked price" className="form-control"/>
              </Form.Item>
            </div>

        </div>
      </Form>
    </Modal>
  );
}

export default CreateEditPurchase; 