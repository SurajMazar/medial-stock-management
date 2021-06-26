import {Button, Form,Input,Modal} from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createVendor, fetchVendors } from '../../services/vendor.service';
import { setFormdata } from '../../utils/helper.utils';

interface createVendorInterface {
  showModal:boolean,
  closeModal:()=>void
}

const CreateModal:React.FC<createVendorInterface> = (props) =>{

  const {
    showModal,
    closeModal
  } = props;

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleCancel = ()=>{
    closeModal();
    form.resetFields();
  }

  const onSubmit = (values:any) =>{
    const formdata = setFormdata({
      name:values.name,
      email:values.email,
      pan_vat:values.pan_vat
    })
    dispatch(createVendor(formdata));
    dispatch(fetchVendors())
  }

  return(
    <>
    <Modal title="Create Vendor" visible={showModal} 
     onCancel={handleCancel}
    footer={[
      <Button 
      key={1}
      form="vendor-create-form"
      htmlType="submit"
      size="middle"
      shape="round"
      type="primary"
      >Add</Button>
    ]}
     >
      <Form
        layout='vertical'
        className="mwd-backend-form"
        form={form}
        onFinish={onSubmit}
        id="vendor-create-form"
      >

        <Form.Item
          label="Name"
          name="name"
          className="mb-4"
          rules={[
            {required: true, message: 'Vendor\'s name is required' },
          ]}
        >
          <Input type={'text'} className="form-control" placeholder="Name" size="large"  />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          className="mb-4"
          rules={[
            {required: true, message: 'Vendor\'s email is required' },
          ]}
        >
          <Input type={'email'} className="form-control" placeholder="Email" size="large"  />
        </Form.Item>

        <Form.Item
          label="Pan/Vat no."
          name="pan_vat"
          className="mb-4"
          rules={[
            {required: true, message: 'Vendor\'s Pan/Vat no. is required' },
          ]}
        >
          <Input type={'text'} className="form-control" placeholder="Pan/Vat no." size="large"  />
        </Form.Item>

      </Form>
    </Modal>
    </>
  );
}


export default CreateModal;