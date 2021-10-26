import { Modal, Form, Button, Input, InputNumber, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CustomSelect from '../../../../components/DataTable/select';
import Product from '../../../../model/product.model';
import { purchase } from '../../../../model/purchase.model';
import { fetchProducts } from '../../../../services/product.service';
import { createSaleItem } from '../../../../services/sales.service';
import { StoreInterface } from '../../../../store/store';
import { setFormdata } from '../../../../utils/helper.utils';

interface Props{
  visible:boolean,
  closeModal:()=>void
}
const AddEditSale:React.FC<Props> = (props)=>{
  const {closeModal,visible} = props

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {id} = useParams<any>();

  //redux store
  const state = useSelector((state:StoreInterface)=>state)
  const {loadingProduct,products} = state.product;


  // component state
  const [itemPurchases,setItemPurchases] = useState<Array<purchase>>([])
  const [selectedProduct,setSelectedproduct] = useState<Product|undefined>(undefined)


  const loadProducts = (params:any={page:1})=>{
    dispatch(fetchProducts(params))
  }


  const handleClose = () =>{
    form.resetFields();
    closeModal();
  }


  const onProductSelected = (id:number|string) =>{
    const selected = products?.find(item=>Number(item.id) === Number(id));
    setSelectedproduct(selected)
    if(selected){
      setItemPurchases(selected.purchases)
    }
  }


  const productHasSubUnit= () =>{
    if(selectedProduct){
      return JSON.parse((selectedProduct.has_sub_units).toString()||"0")? true:false
    }
    return false;
  }



  const handleSubmit = (values:any)=>{

    if(selectedProduct && values.purchase_id){
      let total = 0;
      if(productHasSubUnit() && values.sub_unit){
        const totalQuantity = Number(values.quantity) + (Number(values.sub_unit)/Number(selectedProduct.subunits_per_quantity))
        total = Number((totalQuantity * values.rate).toFixed(2))
      }else{
        total = Number(values.quantity) * values.rate
      }
      const formData = setFormdata({
        purchase_id:values.purchase_id,
        total:total,
        rate:values.rate,
        sale_invoice_id:id,
        quantity:parseFloat(`${String(values.quantity)}.${String(values.sub_unit)}`)
      })
      dispatch(createSaleItem(formData,handleClose))
    }else{
      if(!values.purchase_id){
        message.error('Select product\'s batch')
      }
    }
   

  }


  return(
    <Modal
      visible={visible}
      onCancel={handleClose}
      title={`Add item`}
      footer={[
        <div key="1" className="d-flex align-items-center">
        <Button
          htmlType="submit"
          type="primary"
          shape="round"
          form="create-sales-form"
          className="mr-2"
        >{`Add item`}</Button>
          <Button shape="round" onClick={handleClose}>Cancel</Button>
        </div>
      ]}
    >
      <Form
        layout="vertical"
        id="create-sales-form"
        onFinish={handleSubmit}
        form={form}
      >
        <div className="row">
          <div className="col-md-12">
            <CustomSelect
              label="Product"
              name="product_id"
              loading={loadingProduct}
              options={products || []}
              placeholder="Select product"
              required={true}
              search={loadProducts}
              handleChange={onProductSelected}
            />
          </div>
          {itemPurchases && itemPurchases.length?
          <div className="col-md-12">
            <CustomSelect
              label="Batch"
              name="purchase_id"
              loading={false}
              options={itemPurchases || []}
              placeholder="Select batch"
              required={true}
              displayValue={'batch'}
              search={()=>{}}
            />
          </div>
          :<div className="col-md-12 mb-4">No product selected or product is out of stock !</div>}

          <div className="col-md-6">
            <Form.Item
              label="Quantity"
              name="quantity"
            >
              <InputNumber className="w-100" placeholder="Quantity" />
            </Form.Item>
          </div>


          {productHasSubUnit()?
              <div className="col-md-6">
              <Form.Item
                label={`Sub units (${selectedProduct?.sub_unit_name})`}
                name="sub_unit"
              >
                <InputNumber className="w-100" placeholder="Sub unit" max={selectedProduct?.subunits_per_quantity}/>
              </Form.Item>
              <div className="mb-1 mt-1">
                {`max allowed value is ${selectedProduct?.subunits_per_quantity} as an unit contains ${selectedProduct?.subunits_per_quantity} 
                ${selectedProduct?.sub_unit_name} if more than that increase the quantity`}
              </div>
            </div>:''}


            <div className="col-md-12">
            <Form.Item
              label="Rate"
              name="rate"
              rules={
                [{
                  required:true,
                  message:'This field is required !'
                }]
              }
            >
              <Input type='text' className="w-100" placeholder="Rate" />
            </Form.Item>
          </div>

        </div>
      </Form>
    </Modal>
  )
}

export default AddEditSale