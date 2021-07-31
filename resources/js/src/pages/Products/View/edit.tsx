import { Button, Form, Input } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CustomSelect from '../../../components/DataTable/select';
import Product from '../../../model/product.model';
import { fetchProductByID, fetchProductCategory, updateProduct } from '../../../services/product.service';
import { StoreInterface } from '../../../store/store';
import Preloader from '../../../components/Preloader';
import { removeNullItems, setFormdata } from '../../../utils/helper.utils';
import TextEditor from '../../../components/TextEditor';


interface routeParams{
  id:string
}

interface Props{
  product:Product|undefined,
  loading:boolean
}

const ProductEdit:React.FC<Props> = (props) =>{

  const {loading,product} = props

  const [form] = Form.useForm();
  const {id} = useParams<routeParams>();
  //store
  const dispatch = useDispatch();
  const state = useSelector((state:StoreInterface)=>{
    const {product} =  state;
    return product;
  })
  const {loading:loadingPC,categories} = state;
  const loadPC = (params:any)=>{
    dispatch(fetchProductCategory(params));
  }
  //end store

  const [hasSubUnit,setHasSubUnit] = React.useState<boolean>(false);

  const [updating,setUpdating] = useState<boolean>(false);

  //editing
  useEffect(()=>{
    if(product){
      if(product.sub_unit_name){
        setHasSubUnit(true);
      }
      form.setFieldsValue({
        ...product,
        product_category_id:product.category.id || ''
      });
    }
  },[product])//eslint-disable-line

  // update function
  const onSubmit = async(value:any) =>{
    setUpdating(true);
    value = removeNullItems(value);
    if(!hasSubUnit){
      value.sub_unit_name = "";
      value.subunits_per_quantity = "";
    }
    const form = setFormdata({
      ...value,
      has_sub_units:hasSubUnit?1:0,
      _method:'put'
    })
    await updateProduct(id,form);
    setUpdating(false);
  }

  return(
    <div className="section-break-2">
      {loading || updating?<Preloader/>:
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <div className="row">
          <div className="col-md-6">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {required:true,message:'Product\'s name is required!'}
              ]}
            >
              <Input placeholder="Name" className="form-control"/>
            </Form.Item>
          </div>

          <div className="col-md-6">
            <CustomSelect
              label="Product's category"
              name="product_category_id"
              loading={loadingPC}
              search={loadPC}
              options={categories||[]}
              placeholder="Product's Category"
              required={true}
              defaultOption={product?.category || ""}
            />
          </div>

          <div className="col-md-2 mb-4">
            <Checkbox onChange={
              (value)=>{
                if(value.target.checked){
                  setHasSubUnit(true);
                }else{
                  setHasSubUnit(false);
                }
              }
            } checked={hasSubUnit}>Has sub unit?</Checkbox>
          </div>
          {hasSubUnit? 
          <>
            <div className="col-md-5">
              <Form.Item
                name="sub_unit_name"
                label="Sub unit name"
                rules={
                  [{required:true,message:"This field is required!",}]
                }
              >
                <Input placeholder="Sub unit name" className="form-control"/>
              </Form.Item>
            </div>  
          
            <div className="col-md-5">
              <Form.Item
                name="subunits_per_quantity"
                label="units per quantity"
                rules={
                  [
                    {
                      required:true,message:"This field is required!",
                    },
                  ]
                }
              >
                <Input placeholder="Units per quantity" className="form-control"/>
              </Form.Item>
            </div>  

          </>
            :""}

          <div className="col-12 ">
            <Form.Item
              name="description"
              label="Description">
                <TextEditor/>
            </Form.Item>
          </div>

          <div className="col-md-12 mt-4">
            <Button htmlType="submit" shape="round" type="primary">Update</Button>
          </div>             
        </div>
      </Form>
    }
    </div>
  );
}

export default ProductEdit;