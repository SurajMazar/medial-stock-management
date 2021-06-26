import { Col, Row,Input } from 'antd';
import React, { useEffect, useState } from 'react';
import {SearchOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

interface DTinterface {
  fetchData:(params:any)=>void
}
const DatTableWrapper:React.FC<DTinterface> = props =>{

  const {children,fetchData} = props;

  const [keyword,setKeyword] = useState<string>('');
  const [currentPage,setCurrentPage] = useState<number|undefined>(1);

 
  
  
  const search = debounce((value)=>{
    setKeyword(value);  
    fetchData({
      keyword:value,
      page:currentPage
    });
  },1000);

  const onKeywordChange = (e:React.FormEvent<HTMLInputElement>)=>{
    let value = e.currentTarget.value;
    search(value);
  }


  return(
    <div>
      <Row gutter={[8,8]} className="section-break-1">
      <Col  xs={24} md={12} lg={18}> 
      </Col>
      <Col  xs={24} md={12} lg={6}> 
        <Input size="large" className="fm-rounded" onChange={onKeywordChange}  placeholder="Search" prefix={<SearchOutlined />} />
      </Col>
      </Row>
      {children}
    </div>
  );
}

export default DatTableWrapper;