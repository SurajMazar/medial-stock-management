import { DeleteOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Button,Checkbox,DatePicker,Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomSelect from '../../../components/DataTable/select';
import LabTest from '../../../model/labTest.model';
import LabInvoice from '../../../model/labInvoice.model';
import { fetchCustomerService } from '../../../services/customer.service';
import { createLabInvoice, fetchLabInvoiceByID, fetchLabTests, updateLabInvoice } from '../../../services/labTests.service';
import { StoreInterface } from '../../../store/store';
import { NepaliNS, removeNullItems, setFormdata } from '../../../utils/helper.utils';
import {useParams} from 'react-router-dom'
import Preloader from '../../../components/Preloader';
import moment from 'moment';
import useAfterEffect from '../../../hooks/useAfterEffect';
import { exportPDF } from '../../../services/export.service';
interface alterations{
  name:string,
  operation:"add"|"sub",
  amount:number
}


const AddEditLabInvoice = () => {

  const [form] = Form.useForm();
  const {id} = useParams<any>()
  const dispatch = useDispatch();
  const state = useSelector((state:StoreInterface)=>state);
  const {loading,customers} = state.customer;
  const {userId} = state.auth
  const {labTests,loadingLT} = state.labTests;

  //state
  const [existingCustomer,setExistingCustomer] = useState<boolean>(false);
  const [tests,setTests] = useState<any>([]);
  const [total,setTotal] = useState<number>(0);
  const [alt,setAlt] = useState<Array<alterations>>([]);
  const [creating,setCreating] = useState(false);
  const [loadingEditData,setLED] = useState(false);
  const [editData,setEditData] = useState<undefined|LabInvoice>()
  const [grandTotal,setGrandTotal] = useState<number>(0);


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
      if(parent.tests){
        if(e.target.checked && !parent.tests.find((item:any)=>item.name === test.name)){
          subTests = [{
            ...test,
            result:''
          }].concat(parent.tests);
        }else{
          subTests = parent.tests.filter((item:any)=> item.name !== test.name);
        }
        parent.tests = subTests;
      }else{
        parent.tests =[{
          ...test,
          result:''
        }]
      }
      if(indexParent) { updatedTest[indexParent] = parent;}
    }
    setTests(updatedTest);
  }
  // end create test


  // update total
  useEffect(()=>{
    let total = 0;
    if(tests && tests.length){
      tests.forEach((test:any)=>{
        const {tests:labTests} = test;
        if(labTests && labTests.length){
          labTests.forEach((test:any)=>{
            total = total + parseInt(test.price);
          })
        }
      })
    }
    setTotal(total);
  },[tests]);


  //form submit handler
  const handleFormSubmit = async(values:any,notify=true) =>{
    if(notify){setCreating(true);}
    values = removeNullItems(values);
    const form = setFormdata({...values,
      tests:JSON.stringify(tests),
      alterations:JSON.stringify(alt),
      user_id:userId,
      _method:editData?'PUT':"POST",
      amount:grandTotal
    })
    if(id){
      await updateLabInvoice(id,form,notify)
    }else{
      await createLabInvoice(form);
    }
    setCreating(false);
  }


  //alterations
  const addAlt = () =>{
    const newAlt:alterations = {
      name:'',
      operation:'add',
      amount:0
    }
    let oldAlt = [...alt] ;
    setAlt(oldAlt.concat([newAlt]));
  }


  const onAltChange = (e:React.ChangeEvent<HTMLInputElement>
    |React.ChangeEvent<HTMLSelectElement>,i:number,type:'name'|'operation'|'amount') =>{
    const value:any = e.target.value;
    let obj = alt.find((item,index)=>index===i);
    let oldObj:any = {...obj}
    oldObj[type] = value 
    let oldArray = [...alt];
    oldArray[i] = oldObj
    setAlt(oldArray);
  }

  const removeAlteration = (i:number) =>{
    let oldObj = [...alt];
    oldObj = oldObj.filter((item,index)=>index !== i);
    setAlt(oldObj);
  }
  // end alterations


   //grand total
   const calculateGrandTotal = () =>{
     if(alt && alt.length){
       let gt = total;
       alt.forEach(item=>{
         if(item.operation === 'sub'){
           gt = parseFloat(gt.toString()) - parseFloat(item.amount?item.amount.toString():"0");
         }else{
           gt = parseFloat(gt.toString()) + parseFloat(item.amount?item.amount.toString():"0");
         }
       })
       setGrandTotal(gt);
     }
     else{
       setGrandTotal(total);
     }
   }
   useEffect(()=>{
     calculateGrandTotal();
   },[total,alt])//eslint-disable-line
   // end grand total section


  //  useAfterEffect(()=>{
  //   handleFormSubmit(form.getFieldsValue(),false)
  // },[grandTotal]);



   //incase of editing
   const fetchliByID = async()=>{
    setLED(true)
    const response = await fetchLabInvoiceByID(id)
    setEditData(response)
    setLED(false)
   }

   useEffect(()=>{
    if(id){
      fetchliByID()
    }
   },[id])


   useEffect(()=>{
    if(editData){
      if(editData.customer_id){
        setExistingCustomer(true)
      }
      form.setFieldsValue({
        ...editData,
        invoice_date:moment(editData.invoice_date)
      })

      if(editData.tests){
        setTests(JSON.parse(editData.tests))
      }

      if(editData.alterations){
        setAlt(JSON.parse(editData.alterations))
      }
    }
   },[editData])


   const updateResult = (e:any,ptest:number,ctest:number)=>{
    const allTests = [...tests]
    const parent = allTests[ptest];
    const child = parent.tests[ctest];
    child.result = e.target.value;
    setTests(allTests)
   }

   const exportInvoicePdf = async(print:boolean = false)=>{
    await exportPDF('lab-invoices/export_pdf',`lab-invoice-${id}`,id,print);
  }

  const exportReportPdf = async(print:boolean = false)=>{
    await exportPDF('lab-invoices/export_pdf_report',`lab-report-${id}`,id,print);
  }

  return (
    <section className="page-section-2">
       <div className="d-flex ac">
        <h3 className="text-22">{editData?`Edit`:'Add'} Lab Invoices</h3>
        <div className="d-flex ml-auto">
          <Link to="/lab-invoices" className='mr-2'><Button shape="round" type="primary" size="middle">
            List</Button></Link>

          <Button shape='round'
            icon={<FilePdfOutlined />}
            onClick={()=>exportInvoicePdf()}
            size="middle" className="mr-1 mb-1" title="Export invoice" 
            type="primary"
            >
              Export  invoice
            </Button>

          <Button shape='round' 
          onClick={()=>exportReportPdf()}
          icon={<FilePdfOutlined />} size="middle" title="Export report" className="mr-1 mb-1" type="primary">
            Export report
          </Button>
        </div>
      </div>

      {
        loadingEditData?<Preloader/>:
      <div className="section-break-1">
        <Form
          layout='vertical'
          form={form}
          onFinish={handleFormSubmit}
          className="floating-button-wrapper"
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

            <div className="col-md-3 mb-4">
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

            {
            editData?<>
            <h4 className="text-18px">Tests</h4>
              <div className="table-responsive">
                {
                  tests && tests.length?
                  tests.map((test:any,index:number)=>(
                    <table className="table mb-4" key={index}>
                      <thead>
                        <tr>
                          <th colSpan={4}>{test.name}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>Test</th>
                          <th>Normal value</th>
                          <th>Price</th>
                          <th>
                            Result
                          </th>
                        </tr>
                        {test.tests && test.tests.length?
                          test.tests.map((t:any,index2:number)=>(
                            <tr key={index2}>
                              <td>{t.name}</td>
                              <td>{t.normal}</td>
                              <td>{t.price}</td>
                              <td>
                                <Input type="text" value={t.result} onChange={(e)=>updateResult(e,index,index2)}/>
                              </td>
                            </tr>
                            ))
                        :''}
                       
                      </tbody>
                    </table>
                  )):''
                }
               
              </div>
            </>
            :
            <div className="col-md-12">
              <div className="col-md-12 mt-2">
                <h3 className="text-20px">Tests</h3>
                <hr/>
                <p><i>(Select all the required tests! )</i></p>
              </div>
              
              <div className="col-md-12 mt-2">
                <div className="row">
                  {
                    !loadingLT?
                    labTests && labTests.length?
                    labTests.map((lt,i)=>(
                      <div className="col-md-4 mb-4" key={i}>
                        <div className="card">
                          <div className="card-header" style={{background:'#eee'}}>
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
            </div>}

            <div className="col-md-12">
              <div className="col-md-12 mt-2">
                <div className="mt-2">
                 <b><p className="text-16px">Total: Rs. {NepaliNS(total)}</p></b> 
                </div>
              </div>

            </div>
  
          </div>

          <div className="col-md-8 mt-4">
            <div className="row">
              <div className="">
                <Button onClick={addAlt} htmlType="button" shape="round" type="primary">Add alteration</Button>
              </div>
            </div>

            <div className="row mt-3 pt-2 pb-2" style={{borderTop:"1px solid #bcbcbc",borderBottom:"1px solid #bcbcbc"}}>
              <div className="col-4">
                <h3 className="text-14px">Alteration name</h3>
              </div>
              <div className="col-2">
                <h3 className="text-14px">Operation</h3>
              </div>
              <div className="col-4">
                <h3 className="text-14px">Amount</h3>
              </div>
              <div className="col-2">
              </div>
            </div>

            <div className="mt-2">
            {
              alt && alt.length ?
              alt.map((item,i)=>(
                <div className="row mt-2" key={i} >
                  <div className="col-4">
                    <input type="text"
                      onChange={(e)=>onAltChange(e,i,'name')}
                    className="form-control" placeholder="Alter. name" value={item.name}/>
                  </div>
                  <div className="col-2">
                    <select value={item.operation} className="form-control"
                    onChange={(e)=>onAltChange(e,i,'operation')}>
                      <option value="add">+</option>
                      <option value="sub">-</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <input type="text" 
                    onChange={(e)=>onAltChange(e,i,'amount')}
                    className="form-control"  placeholder="Alter. name" value={item.amount}/>
                  </div>
                  <div className="col-2 d-flex align-items-center">
                    <DeleteOutlined onClick={ ()=>removeAlteration(i)} className="btn btn-outline-danger"/>
                  </div>
                </div>
              )):
              <div className="mt-2 text-center">
                Sorry no alterations found!
              </div>
            }
            </div>

            <div className="row mt-3 pt-2 pb-2" style={{borderTop:"1px solid #bcbcbc"}}>
              <div className="col-6">
                <h4 className="text-left text-16px">Grand Total</h4>
              </div>
              <div className="col-6">
                <h4 className="text-left text-16px">Rs. {NepaliNS(grandTotal)}</h4>
              </div>
            </div>

            {/* <div className="col-md-12 mt-2 text-center text-15px-primary">
              Please update the total amount before exiting
            </div> */}

          </div>

          <div className="floating-button">
            <Button size="middle" shape="round" className="btn-success"
              htmlType="submit" loading={creating}
              disabled={total===0}
            >{editData?'Update':'Create'}</Button>
          </div>
        </Form>
      </div>
      }
    </section>
  );
}

export default AddEditLabInvoice;
