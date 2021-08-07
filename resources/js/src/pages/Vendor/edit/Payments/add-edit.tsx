import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Input, DatePicker } from 'antd';
import Payment from '../../../../model/payment.model';
import Vendor from '../../../../model/vendors.model';
import { removeNullItems, setFormdata } from '../../../../utils/helper.utils';
import { useDispatch } from 'react-redux';
import { addPaymentService, 
  // fetchVendor,
   updatePaymentService } from '../../../../services/vendor.service';
import { useParams } from 'react-router';
import moment from 'moment';

interface Props {
  visible: boolean,
  closeModal: Function,
  editData: Payment | undefined,
  vendor: Vendor | undefined
}

interface paramsProps{
  id:string
}
const {TextArea} = Input;

const AddEditPayment: React.FC<Props> = (props) => {

  const {
    closeModal,
    editData,
    visible,
    vendor
  } = props;

  // const [maxPayment, setMaxPayment] = useState<number>(0)

  const [form] = Form.useForm();
  const {id:vendorId} = useParams<paramsProps>();
  const dispatch = useDispatch();

  const handleModelClose = () => {
    form.resetFields();
    closeModal();
  }

  // const calculateMax = () => {
  //   if (vendor) {
  //     let max = Number(vendor.total_purchases) - Number(vendor.total_payments);
  //     if(editData){
  //       setMaxPayment(max+Number(editData.paid_amount));
  //     }else{
  //       setMaxPayment(max);
  //     }
  //   } else {
  //     setMaxPayment(0);
  //   }
  // }

  // useEffect(() => {
  //   calculateMax();
  // }, [vendor,editData]);//eslint-disable-line

  useEffect(()=>{
    if(editData){
      form.setFieldsValue({
        ...editData,
        payment_date:moment(editData.payment_date)
      });
    }
  },[editData])//eslint-disable-line

  const handleSubmit = async(values:any)=>{
    values = removeNullItems(values);
    if(editData){
      values =setFormdata({
        ...values,
        _method:"PUT"
      })
      await dispatch(updatePaymentService(editData.id,values,handleModelClose));
    }else{
      values = setFormdata({
        ...values,
        vendor_id:vendorId
      })
      await dispatch(addPaymentService(values,handleModelClose));
    }

    // dispatch(fetchVendor(vendorId));
  }

  return (
    <>
      <Modal
        visible={visible}
        title={editData ? "Update payment" : "Add payment"}
        onCancel={handleModelClose}
        footer={[
          <div key={3}>
            {/* {
              maxPayment > 0 ? */}
                <Button shape="round" size="middle" type="primary"
                  htmlType="submit" form="add-edit-payment-form"
                >{editData ? 'Update' : 'Add'}</Button>
                {/* : ''} */}
          </div>
        ]}
      >
        <>
          {/* {maxPayment > 0 ? */}
            <Form
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              id="add-edit-payment-form"
            >

              <Form.Item
                label={"Payment Type"}
                name={"payment_type"}
                rules={
                  [
                    {
                      required: true, message: "This field is required !",
                    },
                  ]
                }
              >
                <Input className="form-control" placeholder="Payment Type" />
              </Form.Item>


              <Form.Item
                label={"Payment date"}
                name={"payment_date"}
                rules={
                  [
                    {
                      required: true, message: "This field is required !",
                    },
                  ]
                }
              >
                <DatePicker placeholder="Payment Date" className="form-control" />
              </Form.Item>

              <Form.Item
                label={"Paid by"}
                name={"paid_by"}
                rules={
                  [
                    {
                      required: true, message: "This field is required !",
                    },
                  ]
                }
              >
                <Input className="form-control" placeholder="Paid By" />
              </Form.Item>



              <Form.Item
                label={"Received by"}
                name={"receiving_person"}
                rules={
                  [
                    {
                      required: true, message: "This field is required !",
                    },
                  ]
                }
              >
                <Input className="form-control" placeholder="Received by" />
              </Form.Item>

              <Form.Item
                label={"Amount"}
                name={"paid_amount"}
                rules={
                  [
                    {
                      required: true, message: "This field is required !",
                    },
                  ]
                }
              >
                <Input type="number" min="0" 
                // max={maxPayment} 
                className="form-control" 
                // placeholder={`Due Rs ${maxPayment}`}
                placeholder="paid amount"
                 />
              </Form.Item>


              <Form.Item
                label={"Note (optional)"}
                name={"note"}
              >
                <TextArea className="form-control" placeholder="Note" />
              </Form.Item>

            </Form> 
            {/* :<div className="text-center"> Sorry no purchases made or due has already been cleared !</div> */}
          {/* } */}
        </>
      </Modal>
    </>
  );
}

export default AddEditPayment;