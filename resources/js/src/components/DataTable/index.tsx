import { Col, Row,Input, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import {DatePicker} from 'antd';
import {SearchOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import PageMeta from '../../model/page_meta.model';

const {RangePicker} = DatePicker;
interface DTinterface {
  fetchData:(params:any)=>void,
  meta:PageMeta|undefined,
  dateRange?:boolean,
  dateRangeTitle?:string
}
const DatTableWrapper:React.FC<DTinterface> = props =>{

  const {children,fetchData,meta,dateRange,dateRangeTitle} = props;

  const [keyword,setKeyword] = useState<string>('');
  const [dateR,setDateRange] = useState<{from:string,to:string}|undefined>(undefined)

  // search with keywords
  const search = debounce((value)=>{
    setKeyword(value);
    let values:any = {
      keyword:value,
      page:1,
    }
    if(dateR){
      values ={
         ...values,
        from:dateR?.from,
        to:dateR?.to
      } 
    }
    fetchData(values);
  },1000);

  const onKeywordChange = (e:React.FormEvent<HTMLInputElement>)=>{
    let value = e.currentTarget.value;
    search(value);
  }
  // end search with keywords

  //on page change
  const onPageChange = (value:number)=>{
    if(meta){
      let values:any = {
        keyword:keyword,
        page:value,
      }

      if(dateR){
        values ={
           ...values,
          from:dateR?.from,
          to:dateR?.to
        } 
      }
      fetchData(values);
    }
  }
  // end page change


  //on date filter change
  const onDateFilterChange = (value:any)=>{
    if(value){
      setDateRange({
        from:value[0],
        to:value[1]
      })
      fetchData({
        keyword:keyword,
        page:1,
        from:value[0],
        to:value[1]
      });
    }
  }
  // ende date filter change
  

  useEffect(()=>{
    fetchData({page:1})
  },[])//eslint-disable-line

  return(
    <div>
      <Row gutter={[8,8]} className="section-break-1-2">
        <Col  xs={24} md={12} lg={dateRange?10:18}> 
        </Col>
        {
          dateRange?
          <Col  xs={24} md={12} lg={8} > 
            <p className="ml-2">Filter by {dateRangeTitle||''}</p>
            <RangePicker className="round-input" onChange={(value,val)=>onDateFilterChange(val)}/>
          </Col>:''
        }
        <Col  xs={24} md={12} lg={6}> 
          <p className="ml-2">Search</p>
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