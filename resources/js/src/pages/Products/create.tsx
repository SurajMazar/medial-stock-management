import {Button, Form,Input,Modal} from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomSelect from '../../components/DataTable/select';
import { createProduct, fetchProductCategory } from '../../services/product.service';
import { StoreInterface } from '../../store/store';
import { removeNullItems, setFormdata } from '../../utils/helper.utils';
import CreateEditCategory from './Category/create-edit';

interface Props {
  visible:boolean,
  closeModal:()=>void,
}

const CreateProductComponent:React.FC<Props> = (props)=>{


  // store
  const dispatch = useDispatch();
  const store = useSelector((state:StoreInterface)=>{
    const {product} = state;
    return product;
  });
  const {categories,loading} = store;
  const loadPC = (params:any) =>{
    dispatch(fetchProductCategory(params));
  }
  //store

  const { closeModal, visible} = props;

  const [form] = Form.useForm();



  const handleClose = () =>{
    closeModal();
    form.resetFields();
  }


  // add cat model
  const [showCatModel,setShowCatModel] = React.useState<boolean>(false);
  const openModel = ()=>{
    handleClose();
    setShowCatModel(true);
  }
  const closeCatModel = () =>{
    setShowCatModel(false);
  }
  // end add cat model



  const handleFormSubmit = (value:any) =>{
    value = removeNullItems(value);
    let form = setFormdata({
      ...value
    });
    dispatch(createProduct(form));
  }

  return (
    <>
    <Modal
      onCancel={handleClose}
      visible={visible}
      title={'Add Product'}
      footer={[
        <Button key="1" shape='round' size="middle" 
          htmlType="submit" form="msm-product-create-form" type="primary">
          Add
        </Button>
      ]}
    >
      <Form
        id="msm-product-create-form"
        layout="vertical"
        form={form}
        onFinish={handleFormSubmit}
      >
        <div className="row">

          <div className="col-md-12">
            <Form.Item 
              label="Name"
              name="name"
              rules={
                [{
                  required:true,message:'Product\'s name is required'
                }]
              }
            >
              <Input className="form-control" placeholder="Name"/>
            </Form.Item>
          </div>

          <div className="col-md-12">
            <CustomSelect 
              placeholder="Select product's category" 
              loading={loading}
              search={loadPC}
              options={categories||[]}
              name="product_category_id"
              label="Product category"
              required={true}
              dropDownRenderer={()=>(
                <div className="text-center p-1" style={{borderTop:'1px solid #bcbcbc'}}>
                  <div className="text-primary" style={{cursor:'pointer'}}
                  onClick={openModel}
                  >Add new category</div>
                </div>
              )}
            />
          </div>

        </div>
      </Form>
    </Modal>
    <CreateEditCategory 
      showModal={showCatModel}
      closeModal={closeCatModel}
      editData={undefined}
    />
    </>
  )
}


export default CreateProductComponent;