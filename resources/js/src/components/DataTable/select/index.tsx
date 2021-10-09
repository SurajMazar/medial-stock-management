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
  displayValue?:string|Array<string>
  handleChange?:any
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
    displayValue,
    handleChange
  } = props;


  const displayName = (item:any,array:Array<any>) =>{
    let name = '';
    array.forEach((key:any,i)=>{
      if(i<array.length-1){
        name += item[key] + '-'
      }else{
        name += item[key]
      }
    })
    return name;
  }

  const getSelectOptions = (List:Array<any>,errorMessage="Sorry no data found") => {
    if(List && List.length){
      return(
        <>
        {List.map((item:any) =>(
          <Option value={item.id} key={item.id}>
            {displayValue? Array.isArray(displayValue) ? 
              displayName(item,displayValue)
            :item[displayValue]  
            : item.name || item.title  }
          </Option>
        ))}
        </>
      )
      
    }else{
      return(
        <Option disabled value={"test"} key={0}>
          {errorMessage}
        </Option>
      )
    }
  }
  
  const handleSearch = debounce((value) =>{
    search({
      keyword:value,
      page:1
    })
  },500);


  useEffect(()=>{
    if(!options.length) search({page:1})
  },[]) //eslint-disable-line



  const defChange =  ()=>{}

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
        onChange={handleChange|| defChange}
        dropdownRender={(menu)=>(
          <>
          {menu}
          {dropDownRenderer? dropDownRenderer() :''}
          </>
        )}
      >
        {!loading?
          getSelectOptions(defaultOption?concatArray(options,defaultOption):options):
          <Option value="null" key={'null'} disabled>Loading</Option>
        }
      </Select>
    </Form.Item>
  );
}

export default CustomSelect;