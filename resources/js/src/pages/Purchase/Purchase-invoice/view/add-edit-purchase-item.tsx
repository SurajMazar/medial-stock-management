import {Modal,Form, Button, Input, DatePicker, Select} from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CustomSelect from '../../../../components/DataTable/select';
import { purchase } from '../../../../model/purchase.model';
import { fetchProducts } from '../../../../services/product.service';
import { createPurchase, fetchSinglePurchaseInvoice, updatePurchaseItem } from '../../../../services/purchase.service';
import { StoreInterface } from '../../../../store/store';
import { removeNullItems, setFormdata } from '../../../../utils/helper.utils';

interface Props{
  visible:boolean,
  closeModal:()=>void,
  editData?:purchase|undefined,
  purchases:Array<purchase>|undefined
  callbackUpdate:()=>void
}

interface params{
  id:string
}

const CreateEditPurchase:React.FC<Props> = (props) =>{

  const {
    closeModal,
    editData,
    visible,
    purchases,
    callbackUpdate
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
  const [free,setFree] = useState<boolean>(false);

  const handleClose = ()=>{
    closeModal();
    form.resetFields();
    setFree(false);
  }

  // free
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
  const handleAdd = async(value:any) =>{
    value.free = free?1:0;
    value.purchase_invoice_id=id;

    if(editData){
      value._method = "PUT";
    }

    let formData;
    if(free){
      const existingProduct = purchases?.find(item=>item.id === value.existing_product);
      delete value.existing_product
      value ={
        ...value,
        code:existingProduct?.code,
        product_id:existingProduct?.product_id,
        pack:existingProduct?.pack,
        rate:existingProduct?.rate,
        batch:existingProduct?.batch,
        expiry_date:existingProduct?.expiry_date,
        marked_price:existingProduct?.marked_price,
      }

      const total = calculateTotal(value).toFixed(2);
      value.amount = total;
      value=removeNullItems(value);
      formData = setFormdata({
        ...value,
      });
    }else{

      const total = calculateTotal(value).toFixed(2);
      value.amount = total;
      value=removeNullItems(value);
      formData = setFormdata({
        ...value,
      });
    }
    if(editData){
     await dispatch(updatePurchaseItem(editData?.id,formData,handleClose));
    }else{
      await dispatch(createPurchase(formData,handleClose));
    }
    callbackUpdate();
  }



  useEffect(()=>{
    if(editData){
      if(Number(editData?.free)){
        setFree(true);
        let item = purchases?.find(item=> !item.free && (item?.product?.name === editData.product?.name));
        if(item){
          form.setFieldsValue({
            existing_product:item.id
          })
        }
      }else{
        setFree(false);
      }
      form.setFieldsValue({
        ...editData,
        product_id:editData?.product?.id,
        expiry_date:moment(editData.expiry_date)
      })
    }
  },[editData]) //eslint-disable-line

  return(
    <Modal
      visible={visible}
      onCancel={handleClose}
      destroyOnClose
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
          <div className="col-md-12">
            <Form.Item
              label="Select an existing product from the invoice"
              name="existing_product"
              rules={
                [
                  {required:true,message:'This field is required !'}
                ]
              }
              >
              <Select placeholder="Select an existing product">
                {
                  purchases && purchases.length?
                  purchases.map(item=>{
                    if(!item.free){
                      return(
                        <Select.Option value={item.id} key={item.id}>
                          {item.product?.name}
                        </Select.Option>
                      )
                    }
                    return '';
                  }):
                  <Select.Option value='' disabled>
                    Purchases are empty
                  </Select.Option>
                }
              </Select>
            </Form.Item>
            
          </div>
            
          :
          <>
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
              >
                <Input type="text" placeholder="Pack" className="form-control"/>
              </Form.Item>
            </div>
          </>
          }
          
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

        {
          free?"":
          <>
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
          </>
        }


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
          </>:
          <>
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
          </>
        }
        </div>
      </Form>
    </Modal>
  );
}

export default CreateEditPurchase; 