export const setUrl = (params:any,url:string) =>{
  if(params){
    Object.keys(params).map((item,i)=>{
      if(i == 0){
        url += `/?${item}=${params[item]}`
      }else{
        url += `&${item}=${params[item]}`
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

export const NepaliNS = (number:string|number,symbol:string = '') => {
  const string = number?.toString()
  if (string?.length > 3) {
    let hundredPlace = string.substring(string.length - 3)
    let remaining = string.slice(0, -3)
    remaining = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ",")
    return symbol +' '+ remaining + ',' + hundredPlace
  }
  return symbol +' '+number
}

export const returnLimitedWords = (string:string, num:number) => {
  if (string.length > num) { string = string.substring(0, num-3) + '...' };
  return string;
}



// remove null item from objects

export const removeNullItems = (object:any)=>{
  if(object){
    Object.keys(object).forEach((key)=>{
      if(object[key] === null || object[key] === "null" || object[key] === undefined){
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


export const removeItemById = (array:any,id:any)=>{
  return array.filter((item:any)=>item.id !== id);
}

export const getSn = (current_page:string|number,number:number) =>{
  return (Number(current_page)-1)*10 + (number+1)
}


export const concatArray = (array:Array<any>,object:any) =>{
  if(object){
    let temp = [...array];
    if(temp.indexOf(object) === -1){
      temp.concat([object]);
    }
    return temp;
  } 
  return object;
}

export const getCurrency = (purchaseInvoice:any) =>{
  if(purchaseInvoice?.currency){
    return purchaseInvoice.currency?.symbol + " ";
  }
  return "Rs ";
}