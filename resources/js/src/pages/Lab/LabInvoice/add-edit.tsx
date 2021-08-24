import { Button,Checkbox,DatePicker,Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomSelect from '../../../components/DataTable/select';
import LabTest from '../../../model/labTest.model';
import { fetchCustomerService } from '../../../services/customer.service';
import { fetchLabTests } from '../../../services/labTests.service';
import { StoreInterface } from '../../../store/store';

const AddEditLabInvoice = () => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((state:StoreInterface)=>state);
  const {loading,customers} = state.customer;
  const {labTests,loadingLT} = state.labTests;

  //state
  const [existingCustomer,setExistingCustomer] = useState<boolean>(false);
  const [tests,setTests] = useState<any>([]);


  const loadCustomers = (params:any = {page:1}) =>{
    dispatch(fetchCustomerService(params));
  }


  /**
   * load all tests
   */
  const loadLabtests = (params:any = {items_per_page:'all'}) =>{
    dispatch(fetchLabTests(params));
  }

  useEffect(()=>{
    loadLabtests();
  },[]); //eslint-disable-line



  // create test
  const setParentTests = (e:any,data:LabTest) =>{
    let newdata = {...data};
    delete newdata.tests; // remove old tests

    let currentTests = [...tests];
    let currentTestsIds:Array<number> = [];
    currentTests.forEach(t=>{
      currentTestsIds.push(t.id);
    })

    if(e.target.checked && currentTestsIds.indexOf(newdata.id) === -1){
      currentTests = [newdata].concat(currentTests);
    }else{
      currentTests = currentTests.filter(item=> item.id !== newdata.id);
    }
    setTests(currentTests);    
  }



  const checkSelected = (id:number) =>{
    const testIds:Array<number> = [];
    tests.forEach((t:any)=>{
      testIds.push(t.id);
    }) 

    return testIds.indexOf(id) !== -1;
  }


  const handleChildrenTests = (e:any,test:any,parentId:number) =>{
    const updatedTest = [...tests];

    //get parent obj
    let parent = updatedTest.find(item=>item.id === parentId);
    let indexParent =  updatedTest.indexOf(parent);
    if(parent){
      let subTests:any = [];
      if(parent.test){
        if(e.target.checked && !parent.test.find((item:any)=>item.name === test.name)){
          subTests = [{
            ...test,
            result:''
          }].concat(parent.test);
        }else{
          subTests = parent.test.filter((item:any)=> item.name !== test.name);
        }

        parent.test = subTests;
      }else{
        parent.test =[{
          ...test,
          result:''
        }]
      }

      if(indexParent) { updatedTest[indexParent] = parent;}
    }

    setTests(updatedTest);
  }
  // end create test




  return (
    <section className="page-section-2">
       <div className="d-flex ac">
        <h3 className="text-22">Add Lab Invoices</h3>
        <div className="ml-auto">
          <Link to="/lab-invoices"><Button shape="round" type="primary" size="middle">
            List</Button></Link>
        </div>
      </div>


      <div className="section-break-1">
        <Form
          layout='vertical'
          form={form}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Invoice number"
                name="invoice_number"
                rules={
                  [
                    {
                      required:true,message:'This field is required!'
                    }
                  ]
                }
              > 
                <Input placeholder="Invoice number" className="form-control"/>
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item
                label="Invoice date"
                name="invoice_date"
                rules={
                  [
                    {
                      required:true,message:'This field is required!'
                    }
                  ]
                }
              > 
                <DatePicker placeholder="Invoice date" className="form-control"/>
              </Form.Item>
            </div>

            <div className="col-md-3">
              <Checkbox checked={existingCustomer} onChange={
                (e)=>setExistingCustomer(e.target.checked)}
                children={"Existing Customer?"}
                />
            </div>


            {
              existingCustomer?
              <div className="col-md-3">
                <CustomSelect
                  label="Customer"
                  name="customer_id"
                  loading={loading}
                  options={customers||[]}
                  placeholder="Select customer"
                  search={loadCustomers}
                  required={true}
                />
              </div>:
              <div className="col-md-3">
                <Form.Item
                  label="Customer name"
                  name="customer_name"
                  rules={
                    [
                      {
                        required:true,message:'This field is required!'
                      }
                    ]
                  }
                >
                  <Input className="form-control" placeholder="Customer name"/>
                </Form.Item>
              </div>
            }

            <div className="col-md-6">
              <Form.Item
                label="Note"
                name="note"
              >
                <Input.TextArea className="form-control" placeholder="Note"/>
              </Form.Item>
            </div>

            <div className="col-md-12 mt-2">
              <h3 className="text-20px">Tests</h3>
            </div>

            <div className="col-md-12 mt-2">
              <div className="row">
                {
                  !loadingLT?
                  labTests && labTests.length?
                  labTests.map((lt,i)=>(
                    <div className="col-md-4" key={i}>
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title text-14px">
                            <Checkbox onChange={(e)=>setParentTests(e,lt)} children={`${lt.name}`} />
                          </h3>
                        </div>
                        {
                          checkSelected(lt.id) ?
                            <div className="card-body">
                              {
                                lt.tests && JSON.parse(lt.tests).length?
                                JSON.parse(lt.tests).map((test:any,i:number)=>(
                                  <div className="mb-1" key={i}>
                                    <Checkbox 
                                      onChange={(e)=>handleChildrenTests(e,test,lt.id)}
                                    children={`${test.name} (Rs ${test.price})`} />
                                  </div>
                                )) :'' 
                              }
                            </div>:""
                        }
                      </div>
                    </div>
                  ))
                  :
                  <div className="col-md-12">
                    <h4 className=" text-14px">No tests found !!</h4>
                  </div>
                  :<div className="col-md-12">
                    <h4 className="text-14px">Loading test !!</h4>
                  </div>
                }
              </div>
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
}

export default AddEditLabInvoice;
