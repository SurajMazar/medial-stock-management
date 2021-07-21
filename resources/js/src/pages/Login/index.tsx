import { Button, Col, Input, Row } from 'antd';
import {Form} from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/auth.service';
import { StoreInterface } from '../../store/store';
import { setFormdata } from '../../utils/helper.utils';

const Login:React.FC = props =>{

  const [form] = Form.useForm();

  const state = useSelector((state:StoreInterface)=>state.auth);

  const dispatch = useDispatch();

  const handleLogin = (value:any) =>{
    const form =  setFormdata(value);
    dispatch(login(form));
  }

  return(
    <section className="auth-wrapper">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 col-sm-12 col-lg-4">
          <div className="auth-card">
            <Form
              id="msm-login-form"
              form={form}
              layout="vertical"
              onFinish={handleLogin}
            >
              <div className="col-md-12">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required:true,message:"This field is required !!"
                    }
                  ]}>
                  <Input className="form-control" placeholder="Your email" type="email"/>
                </Form.Item>
              </div>
              <div className="col-md-12">
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required:true,message:"This field is required !!"
                    }
                  ]}>
                  <Input placeholder="Your password" type="password" className="form-control"/>
                </Form.Item>
              </div>

              <div className="col-md-12 d-flex justify-content-center mt-2">
                <Button   
                loading={state.loading}
                htmlType="submit" type="primary" size="middle" shape="round">Login</Button>
              </div>

            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;