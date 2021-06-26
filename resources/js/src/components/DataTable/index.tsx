import { Col, Row,Input, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import {SearchOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import PageMeta from '../../model/page_meta.model';

interface DTinterface {
  fetchData:(params:any)=>void,
  meta:PageMeta|undefined
}
const DatTableWrapper:React.FC<DTinterface> = props =>{

  const {children,fetchData,meta} = props;

  const [keyword,setKeyword] = useState<string>('');

  // search with keywords
  const search = debounce((value)=>{
    setKeyword(value);  
    fetchData({
      keyword:value,
      page:1
    });
  },1000);
  const onKeywordChange = (e:React.FormEvent<HTMLInputElement>)=>{
    let value = e.currentTarget.value;
    search(value);
  }
  // end search with keywords

  //on page change
  const onPageChange = (value:number)=>{
    if(meta){
      fetchData({
        keyword:keyword,
        page:value
      });
    }
  }
  // end page change


  return(
    <div>
      <Row gutter={[8,8]} className="section-break-1-2">
        <Col  xs={24} md={12} lg={18}> 
        </Col>
        <Col  xs={24} md={12} lg={6}> 
          <Input size="large" className="fm-rounded" onChange={onKeywordChange}  placeholder="Search" prefix={<SearchOutlined />} />
        </Col>
      </Row>
      {children}
      <div className="section-break-2">
        {meta && meta.total > 10?
          <Pagination 
          current={meta.current_page} 
          onChange={onPageChange} 
          total={meta.total} />:''
        }
      </div>
    </div>
  );
}

export default DatTableWrapper;