import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import { removeNullItems, setFormdata } from '../../utils/helper.utils';
import User from '../../model/user.model';
import { changePassword as changeUserPassword } from '../../services/user.service';

interface Props{
  visible:boolean,
  closeModal:()=>void,
  editData:User,
}

const ChangePassword:React.FC<Props>= (props) =>{

  const {
    closeModal,
    visible,
    editData
  } = props;

  const [form] = Form.useForm();

  const handleClose = () =>{
    form.resetFields();
    closeModal();
  }



  const update = async(value:any)=>{
    const form = setFormdata(removeNullItems({...value,_method:'patch'}));
    await changeUserPassword(editData.id,form)
    closeModal()
  }


  return(
    <Modal
      visible={visible}
      title = {"Change password for "+ editData.name}
      onCancel={handleClose}
      footer={
       false
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={update}
      >
          <div className="col-md-12">
            <Form.Item
              label="Password"
              name="password"
              rules={
                [{
                  required:true,message:'This field is required!'
                }]
              }
            >
              <Input id={'p-'+editData.name} placeholder="Password" type="password"  className="form-control"/>
            </Form.Item>
          </div>

          <div className="col-md-12">
            <Form.Item
              label="Confirm Password"
              name="password_confirmation"
              rules={
                [
                  {
                    required:true,
                    message:'Confirm password is required!'
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Password and confirm password fields don\'t match');
                    },
                  }),
                ]
              }>
              <Input placeholder="Confirm password" type="password" className="form-control" id={'cp-'+editData.name}/>
            </Form.Item>
          </div>

          <Button shape="round"  size="middle" type="primary"
          htmlType="submit">{"Change password"}</Button>
      </Form>
    </Modal>
  );
}

export default ChangePassword;