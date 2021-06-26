export const setUrl = (params:any,url:string) =>{
  if(params){
    Object.keys(params).map((item,i)=>{
      if(i == 0){
        url += `/?${item}=${params[item]}`
      }else{
        url += `&&${item}=${params[item]}`
      }
    })
    return url;
  }
  return '';
}

export const setFormdata = (data:any) =>{
  const formData = new FormData();
  Object.keys(data).forEach(key=>{
    formData.append(key,data[key]);
  })
  return formData;         
}


export const returnLimitedWords = (string:string, num:number) => {
  if (string.length > num) { string = string.substring(0, num-3) + '...' };
  return string;
}
