import { Button, Input, Tabs } from 'antd';
import {Form} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Preloader from '../../components/Preloader';
import { createUpdateCustomer, fetchCustomerById, removeEditingCustomer } from '../../services/customer.service';
import { StoreInterface } from '../../store/store';
import { removeNullItems, setFormdata } from '../../utils/helper.utils';
import CustomerTransactions from './transations';

const {TabPane} = Tabs;

interface params{
  id:string
}

const CreateEditCustomer = () =>{

  const {id} = useParams<params>();
  const dispatch = useDispatch();
  const [form] = Form.useForm();



  //state
  const state = useSelector((state:StoreInterface)=>state)
  const {customer} = state;
  const {currentEditing:editData,loading:loadingCustomer} = customer;

  const handleSubmit = (value:any)=>{
    value = removeNullItems(value);
    if(id){
      value._method = "PUT"
    }
    value = setFormdata(value);
    dispatch(createUpdateCustomer(value,id));

  }


  // editing data

  const fetchEditVendor = () =>{
    if(id){
      dispatch(fetchCustomerById(id));
    }
  }

  useEffect(()=>{
    fetchEditVendor()
  },[id])//eslint-disable-line



  useEffect(()=>{
    if(id && editData){
      form.setFieldsValue(editData);
    }
  },[editData,id])


  return(
    <section className="page-section-2">
      {
      loadingCustomer?<Preloader/>:
        <>
        <div className="d-flex flex-wrap ac">
          <h3 className="text-22px">{editData?editData.name:"Add Customer"}</h3>
          <div className="ml-auto">
            <div className="d-flex flex-wrap">
              <Link to="/customers">
                <Button shape='round' size="middle" className="btn-primary mr-2">
                  List
                </Button>
              </Link>
              {
                editData?
                <Link to="/customers/add" onClick={()=>dispatch(removeEditingCustomer())}>
                  <Button shape='round' size="middle" className="btn-primary mr-2">
                    Add 
                  </Button>
                </Link>:""
              }
            </div>
          </div>
        </div>


        <Tabs defaultActiveKey="customer-form" className="mt-2">
          <TabPane key="customer-form" tab="Details">
            <div >
              <Form
                form={form}
                layout={'vertical'}
                id="msm-customer-form"
                onFinish={handleSubmit}
              >
                <div className="row">
                  <div className="col-md-4">
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        {
                          required:true,message:"This field is required!"
                        }
                      ]}
                    >
                      <Input placeholder="Name" className="form-control"/>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <Form.Item
                      label="Email"
                      name="email"
                    >
                      <Input placeholder="Email" className="form-control"/>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <Form.Item
                      label="Mobile"
                      name="mobile"
                    >
                      <Input placeholder="Mobile no" className="form-control"/>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <Form.Item
                      label="Phone"
                      name="phone"
                    >
                      <Input placeholder="Phone" className="form-control"/>
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <Form.Item
                      label="Address"
                      name="address"
                    >
                      <Input placeholder="Address" className="form-control"/>
                    </Form.Item>
                  </div>

                  <div className="col-md-12">
                    <Form.Item
                      label="Description"
                      name="description"
                    >
                      <Input.TextArea placeholder="Description" className="form-control"/>
                    </Form.Item>
                  </div>

                  <div className="col-md-12">
                  <Button shape='round'
                    size="middle" className="btn-success mr-2"
                    form={'msm-customer-form'} htmlType="submit"
                  >
                    Save
                  </Button>
                  </div>
                </div>
              </Form>
            </div>
          </TabPane>
          {
            editData?
            <TabPane key="transactions" tab="Transactions">
              <CustomerTransactions/>
            </TabPane>:""
          }  
          
        </Tabs>
      </>
      }
    </section>
  );

}


export default CreateEditCustomer;