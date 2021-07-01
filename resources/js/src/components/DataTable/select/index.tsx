import {Form, Select} from 'antd';
import { debounce } from 'lodash';
import React, { useEffect } from 'react';
import { concatArray } from '../../../utils/helper.utils';


interface Props{
  label:string
  name:string
  loading:boolean
  search:(params:any)=>void
  options:Array<any>
  placeholder:string
  required:boolean
  defaultOption?:any
  dropDownRenderer?:any
}

const {Option} = Select;


const CustomSelect:React.FC<Props> = (props)=>{

  const {
    label,
    loading,
    name,
    options,
    placeholder,
    required,
    search,
    defaultOption,
    dropDownRenderer,
  } = props;


  const getSelectOptions = (List:Array<any>,errorMessage="Sorry no data found") => {
    if(List && List.length){
      return(
        <>
        {List.map(item =>(
          <Option value={item.id} key={item.id}>
            {item.name || item.title}
          </Option>
        ))}
        </>
      )
      
    }else{
      return(
        <Option disabled value={""} key={0}>
          {errorMessage}
        </Option>
      )
    }
  }
  
  const handleSearch = debounce((value) =>{
    search(value)
  },500);


  useEffect(()=>{
    if(!options.length) search({page:1})
  },[]) //eslint-disable-line

  return(
    <Form.Item
      label={label}
      name={name}
      rules={
        [
          {required:required,message:"This field is required!!"}
        ]
      }
    >
      <Select
        showSearch
        filterOption={false}
        onSearch={handleSearch}
        placeholder={placeholder}
        dropdownRender={(menu)=>(
          <>
          {menu}
          {dropDownRenderer? dropDownRenderer() :''}
          </>
        )}
      >
        {!loading?
          getSelectOptions(defaultOption?concatArray(options,defaultOption):options):
          <Option value="" key={'null'} disabled>Loading</Option>
        }
      </Select>
    </Form.Item>
  );
}

export default CustomSelect;