import {Button, Input, Modal} from 'antd';
import {Form} from 'antd'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ProductCategory } from '../../../model/product.model';
import { createProductCategory, updateProductCategory } from '../../../services/product.service';
import { setFormdata } from '../../../utils/helper.utils';

interface Props{
  showModal:boolean,
  closeModal:()=>void,
  editData:ProductCategory|undefined
}

const CreateEditCategory:React.FC<Props> = (props)=>{

  const {showModal,closeModal,editData} = props;

  const [form] = Form.useForm();
  const dispatch = useDispatch()

  const handleClose = () =>{
    form.resetFields();
    closeModal();
  }


  const create = (value:ProductCategory)=>{
    const form = setFormdata({
      ...value
    }); 
    dispatch(createProductCategory(form,handleClose));
  }

  const update = (value:ProductCategory)=>{
    const form = setFormdata({
      ...value,
      _method:'put'
    }); 
    if(editData) dispatch(updateProductCategory(editData?.id,form,handleClose));
  }

  useEffect(()=>{
    if(editData) form.setFieldsValue(editData);
  },[editData]) // eslint-disable-line

  return (
    <Modal 
      visible={showModal}
      title={editData?"Update product category":"Create product category"}
      onCancel={handleClose}
      footer={[
        <Button shape="round" key={1} size="middle" type="primary"
          form="ce-product-category-form" htmlType="submit"> 
          {editData?"Update":"Create"}
        </Button>
      ]}
    >
      <div>
        <Form 
          id="ce-product-category-form"
          form={form}
          layout="vertical"
          onFinish={editData?update:create}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={
              [{ required:true, message:"Product category's name is required!"}]
            }
          >
            <Input placeholder="Name" className="form-control"/>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default CreateEditCategory;