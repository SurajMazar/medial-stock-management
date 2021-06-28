import {Button, Form, Input} from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Vendor from '../../../model/vendors.model';
import { updateVendor } from '../../../services/vendor.service';
import { removeNullItems, setFormdata } from '../../../utils/helper.utils';

interface editvendorInterface{
  vendor:Vendor|undefined
}

interface paramsInterface{
  id:string
}

const {TextArea} = Input;

const EditVendorForm:React.FC<editvendorInterface>  = (props) =>{

  const {vendor} = props;
  const {id} = useParams<paramsInterface>();

  const [form] = Form.useForm(); 
  const dispatch = useDispatch();


  useEffect(()=>{
    if (vendor) form.setFieldsValue(vendor);
  },[vendor]); //eslint-disable-line


  const update = (value:any) =>{
    value = removeNullItems(value);
    const form = setFormdata({
      _method:'PUT',
      ...value
    });
    dispatch(updateVendor(id,form));
  }

  return (
    <div className="section-break-2">
      <Form
        layout="vertical"
        id="vendors-edit-form"
        className="row"
        form={form}
        onFinish={update}
      >

        <div className="col-md-4">
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {required: true, message: 'Vendor\'s name is required' },
            ]}
          >
          <Input type="text" className="form-control"/>
          </Form.Item>
        </div>


        <div className="col-md-4">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {required: true, message: 'Vendor\'s email is required' },
            ]}
          >
          <Input type="email" className="form-control"/>
          </Form.Item>
        </div>


        <div className="col-md-4">
          <Form.Item
            label="Pan/Vat"
            name="pan_vat"
            rules={[
              {required: true, message: 'Vendor\'s pan/vat is required' },
            ]}
          >
          <Input type="text" className="form-control"/>
          </Form.Item>
        </div>

        <div className="col-md-4">
          <Form.Item
            label="Phone"
            name="phone"
          >
          <Input type="text" className="form-control"/>
          </Form.Item>
        </div>


        <div className="col-md-4">
          <Form.Item
            label="Mobile"
            name="mobile"
          >
          <Input type="text" className="form-control"/>
          </Form.Item>
        </div>


        <div className="col-md-4">
          <Form.Item
            label="Contact person"
            name="contact_person"
          >
          <Input type="text" className="form-control"/>
          </Form.Item>
        </div>

        <div className="col-md-4">
          <Form.Item
            label="Contact person no"
            name="contact_person_number"
          >
          <Input type="text" className="form-control"/>
          </Form.Item>
        </div>

        <div className="col-md-4">
          <Form.Item
            label="Country"
            name="country"
          >
          <Input type="text" className="form-control"/>
          </Form.Item>
        </div>

        <div className="col-md-4">
          <Form.Item
            label="Province/State"
            name="province_state"
          >
          <Input type="text" className="form-control"/>
          </Form.Item>
        </div>

        <div className="col-md-4">
          <Form.Item
            label="City"
            name="city"
          >
          <Input type="text" className="form-control"/>
          </Form.Item>
        </div>

        <div className="col-md-4">
          <Form.Item
            label="Address"
            name="address"
          >
          <Input type="text" className="form-control"/>
          </Form.Item>
        </div>

        <div className="col-md-4">
          <Form.Item
            label="Postal code"
            name="postal_zip"
          >
          <Input type="text" className="form-control"/>
          </Form.Item>
        </div>

        <div className="col-md-12">
          <Form.Item
            label="Description"
            name="description"
          >
          <TextArea rows={4} className="form-control"/>
          </Form.Item>
        </div>


        <div className="col-md-12 mt-2">
          <h3 className="text-22">
            Bank details
            <hr />
          </h3>
        </div>

        <div className="col-md-6">
          <Form.Item
            label="Bank name"
            name="bank_name"
          >
            <Input type="text" className="form-control"/>
          </Form.Item>
        </div>

        <div className="col-md-6">
          <Form.Item
            label="Account name"
            name="account_name"
          >
            <Input type="text" className="form-control"/>
          </Form.Item>
        </div>

        <div className="col-md-6">
          <Form.Item
            label="Account number"
            name="account_number"
          >
            <Input type="text" className="form-control"/>
          </Form.Item>
        </div>


        <div className="col-md-12 mt-2">
          <h3 className="text-22">
            Additional details
            <hr />
          </h3>
        </div>

        <div className="col-md-6">
          <Form.Item
            label="Website"
            name="website"
          >
            <Input type="url" className="form-control"/>
          </Form.Item>
        </div>

        <div className="col-md-6">
          <Form.Item
            label="Facebook"
            name="facebook"
          >
            <Input type="url" className="form-control"/>
          </Form.Item>
        </div>

        <div className="col-md-6">
          <Form.Item
            label="Instagram"
            name="instagram"
          >
            <Input type="url" className="form-control"/>
          </Form.Item>
        </div>

        <div className="col-md-6">
          <Form.Item
            label="Twitter"
            name="twitter"
          >
            <Input type="url" className="form-control"/>
          </Form.Item>
        </div>

        <div className="col-md-6">
          <Form.Item
            label="Linkedin"
            name="linkedin"
          >
            <Input type="url" className="form-control"/>
          </Form.Item>
        </div>

        <div className="col-md-6">
          <Form.Item
            label="Youtube"
            name="youtube"
            
          >
            <Input type="url" className="form-control"/>
          </Form.Item>
        </div>

        <div className="col-md-12">
          <Button shape="round" type="primary" htmlType="submit" size="large">Save</Button>
        </div>

      </Form>
    </div>
  );
}

export default EditVendorForm;