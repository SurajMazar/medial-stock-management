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



// remove null item from objects

export const removeNullItems = (object:any)=>{
  if(object){
    Object.keys(object).forEach((key)=>{
      if(object[key] === null || object[key] === "null"){
        delete object[key]
      }
    })
    return object;
  }
  return {};
}


export const updateItemById = (array:any,item:any)=>{
  let oldItem = array.find((i:any)=>i.id === item.id);
  if(oldItem){
    let oldItemIndex = array.indexOf(oldItem);
    if(oldItemIndex  !== -1) array[oldItemIndex] = item;
  }
  return array;
}