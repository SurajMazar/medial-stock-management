import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DatTableWrapper from '../../../components/DataTable';
import Preloader from '../../../components/Preloader';
import { fetchLabTests } from '../../../services/labTests.service';
import { StoreInterface } from '../../../store/store';
import { getSn } from '../../../utils/helper.utils';


const LabTestList:React.FC = () =>{

  const dispatch = useDispatch();
  const state = useSelector((store:StoreInterface)=>store.labTests);
  const {loadingLT,metaLT,labTests} = state;

  const loadLTs = (params:any= {page:1}) =>{
    dispatch(fetchLabTests(params));
  }

  return(
    <section className="page-section-2">
      <div className="section-break-1-2 d-flex ac">
        <h3 className="text-22">Lab Tests</h3>
        <div className="ml-auto">
          <Link to="/lab-tests/add">
            <Button shape="round" size="middle" type="primary">
              Add Test
            </Button>
          </Link>
        </div>
      </div>

      <div className="section-break-1">
        <DatTableWrapper fetchData={loadLTs} meta={metaLT}>
          {
            loadingLT?<Preloader/>:  
            <table className="table">
              <thead>
                <tr>
                  <th>Sn</th>
                  <th>Name</th>
                  <th>No of tests</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  labTests && metaLT && labTests.length?
                  labTests.map((lt,i)=>(
                    <tr key={i}>
                      <td>{getSn(metaLT.current_page,i)}</td>
                      <td>{lt.name}</td>
                      <td>{lt?.tests?JSON.parse(lt.tests).length:0}</td>
                      <td>
                        <Link to={`/lab-tests/edit/${lt.id}`}>
                          <Button icon={<EditOutlined/>} 
                          shape="round" size="middle" htmlType="button" type="dashed"></Button>
                        </Link>
                      </td>
                    </tr>
                  )):
                  <tr>
                    <td colSpan={4} className="text-center">Sorry no Lab tests found!</td>
                  </tr>
                }
                
              </tbody>
            </table>
          }
        </DatTableWrapper>
      </div>
    </section>
  );
}


export default LabTestList;