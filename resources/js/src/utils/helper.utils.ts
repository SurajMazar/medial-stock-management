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

/**
 * 
 * @param func 
 * @param wait 
 * @returns 
*  @this debounce
 */
export function debounce(func:any, wait:number) {
  let timeout:any;
  return function(this:any) {
    const context:any = this;
    const args = arguments;
    clearTimeout(timeout);
    const later = function() {
      func.apply(context, args);
    };
    timeout = setTimeout(later, wait);
  };
};