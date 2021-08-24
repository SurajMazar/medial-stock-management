import { DeleteOutlined } from '@ant-design/icons';
import { Button , Form, Input, message} from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Preloader from '../../../components/Preloader';
import LabTest from '../../../model/labTest.model';
import { createlabTest, fetchLabTestById, updatelabTest } from '../../../services/labTests.service';
import { setFormdata } from '../../../utils/helper.utils';

interface test{
  name:string,
  normal:string,
  price:number
}

interface params{
  id:string
}

const AddEditLabTest = () => {

  const [form] = Form.useForm();
  const {id} = useParams<params>();

  //states
  const [tests,setTests] = useState<Array<test>>([]);
  const [submitting,setSubmitting] = useState<boolean>(false);
  const [loadingEditData,setLoadingEditData] = useState<boolean>(false);
  const [editData,setEditData] = useState<LabTest|undefined>(undefined); // used for editing


  // addTest
  const addTest = () =>{
    const newTests:Array<test> = [...tests].concat([{
      name:'',
      normal:'',
      price:0
    }]);
    setTests(newTests);
  }

  // remove test
  const removeTest = (index:number)=>{
    const newTests = [...tests].filter((item,i)=> i !== index);
    setTests(newTests);
  }


  const onTestInputChange = (e:React.ChangeEvent<HTMLInputElement>,index:number,field:'normal'|'name'|'price')=>{
    const value = e.target.value;
    const updatedArray = [...tests];
    const newValue:any = updatedArray.find((item,i)=>i===index);

    if(newValue){
      const oldValIndex = updatedArray.indexOf(newValue)
      
      //updating value
      newValue[field] = value;

      //updating array
      updatedArray[oldValIndex] = newValue;

      // setting the value
      setTests(updatedArray);
    }

  }



  const onSubmit = async(values:any) =>{
    if(tests && tests.length){
      setSubmitting(true);
      const form = setFormdata({
        ...values,
        _method:editData?'PATCH':'POST',
        tests:JSON.stringify(tests)
      })
      if(editData){
        await(updatelabTest(id,form));
      }else{
        await(createlabTest(form));
      }
      setSubmitting(false);
    }else{
      message.error("Add atleast one test !")
    }
  }


  //editing data

  const loadED = async() =>{
    setLoadingEditData(true);
    let response = await fetchLabTestById(id);
    setEditData(response);
    setLoadingEditData(false);
  }

  useEffect(()=>{
    if(id) loadED();
  },[id])//eslint-disable-line


  useEffect(()=>{
    if(editData && editData.tests){
      form.setFieldsValue({
        name:editData?.name
      });
      setTests(JSON.parse(editData?.tests));
    }
  },[editData]) //eslint-disable-line


  return (
    <section className="page-section-2">
      {
        loadingEditData?<Preloader/>:
      <>
      <div className="d-flex ac">
        <h3 className="text-22">{editData?"Edit":"Add"} Lab Test</h3>
        <div className="ml-auto">
          <Link to="/lab-tests"><Button shape="round" size="middle">List</Button></Link>
        </div>
      </div>
      <div className="section-break-1">
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Lab test name"
                name="name"
                rules={[
                  {
                    required:true,message:"This field is required !!"
                  }
                ]}
              >
                <Input className="form-control" placeholder="Lab test name"/>
              </Form.Item>
            </div>

            <div className="col-md-12 mt-1">
              <h3 className="text-18px">Tests</h3>

              <div className="mt-1">
                <div className="row">
                  <div className="col-md-8">
                    <div className="table-responsive"> 
                      <table className="table sm">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Normal value</th>
                            <th>Price</th>
                            <th>
                              <Button htmlType="button" type="primary" size="middle" shape="round" onClick={addTest}>
                                Add test
                              </Button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            tests && tests.length?
                            tests.map((test,i)=>(
                              <tr key={i}>
                                <td>
                                  <Input value={test.name} placeholder="Name" type="text" className="form-control"
                                    onChange={(e)=>onTestInputChange(e,i,'name')}
                                  />
                                </td>
                                <td><Input value={test.normal} placeholder="Normal value" type="text" className="form-control"
                                  onChange={(e)=>onTestInputChange(e,i,'normal')}
                                /></td>
                                <td><Input value={test.price} placeholder="Price" type="number" className="form-control"
                                  onChange={(e)=>onTestInputChange(e,i,'price')}
                                /></td>
                                <td>
                                  <Button type="dashed" shape="round" size="middle" icon={<DeleteOutlined/>} onClick={()=>removeTest(i)}></Button>
                                </td>
                              </tr>
                            )):
                            <tr>
                              <td colSpan={3} className="text-center">No test added</td>
                            </tr>
                          }
                        </tbody>
                      </table> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 pt-4">
              <Button
              loading={submitting} 
              className="btn btn-success" shape="round" htmlType="submit" size="middle">{editData?"Update":"Add"} Lab Test</Button>
            </div>
          </div>
        </Form>
      </div>
      </>
      }
    </section>
  );
}

export default AddEditLabTest;
