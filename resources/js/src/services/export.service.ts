import httpBase from "../utils/axios";
import printJS from "print-js";

export const exportPDF = async(route:string,name:string,id:string|number,print:boolean = false) =>{
  try{
    const response = await httpBase().get(`/api/${route}/${id}`,{responseType: 'arraybuffer'});
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    if(print){
      printJS(url);
    }else{
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${name}.pdf`); //or any other extension
      document.body.appendChild(link);
      link.click();
    }
  }catch(e){
    console.log(e);
  }
}