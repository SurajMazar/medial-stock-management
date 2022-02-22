import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Currency from '../../model/currency.model';
import { createCurrency, updateCurrency } from '../../services/currency.service';
import { removeNullItems, setFormdata } from '../../utils/helper.utils';
import countries from '../../constants/countries';
interface Props{
  visible:boolean,
  closeModal:()=>void,
  editData?:Currency|undefined,
}

const CreateEditCurrency:React.FC<Props>= (props) =>{

  const {
    closeModal,
    visible,
    editData
  } = props;

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleClose = () =>{
    form.resetFields();
    closeModal();
  }


  const addCurrency = (value:any)=>{
    const form = setFormdata(removeNullItems(value));
    dispatch(createCurrency(form,handleClose));
  }


  const update = (value:any)=>{
    const form = setFormdata(removeNullItems({...value,_method:'put'}));
    if(editData) dispatch(updateCurrency(editData?.id,form,handleClose));
  }


  useEffect(()=>{
    if(editData) form.setFieldsValue(editData);
  },[editData])

  return(
    <Modal
      visible={visible}
      title = {editData?"Update Currency":"Add new currency"}
      onCancel={handleClose}
      footer={
        [
          <Button shape="round" key={1} size="middle" type="primary"
          htmlType="submit" form="create-edit-currency-form">{editData?'Update':'Add'}</Button>
        ]
      }
    >
      <Form
        id="create-edit-currency-form"
        form={form}
        layout="vertical"
        onFinish={editData?update:addCurrency}
      >

        <div className="row">
          <div className="col-md-12">
            <Form.Item
              label="Name"
              name="name"
              rules={
                [{
                  required:true,message:'This field is required!'
                }]
              }
            >
              <Input placeholder="Name" className="form-control"/>
            </Form.Item>
          </div>

          <div className="col-md-12">
            <Form.Item
              label="Country"
              name="country"
              rules={
                [{
                  required:true,message:'This field is required!'
                }]
              }
            >
              <Select
                placeholder="Country"
                showSearch
                filterOption={(input, option:any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {countries.map(country=>(
                  <Select.Option key={country.code} value={country.name}>
                    {country.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          
          <div className="col-md-12">
            <Form.Item
              label="Symbol"
              name="symbol"
              rules={
                [{
                  required:true,message:'This field is required!'
                }]
              }
            >
              <Input placeholder="Symbol" className="form-control"/>
            </Form.Item>
          </div>

          <div className="col-md-12">
            <Form.Item
              label="Local value"
              name="local_value"
              rules={
                [
                  {
                    required:true,
                    pattern:new RegExp(/[+-]?([0-9]*[.])?[0-9]+/),
                    message:'This field is required and must be a number or float'
                  },
                ]
              }>
              <Input placeholder="Local value" className="form-control"/>
            </Form.Item>
          </div>
        </div>


      </Form>
    </Modal>
  );
}

export default CreateEditCurrency;