import axios from '../utils/axios'


export const fetchVendors = async()=>{
  try{
    const response = await axios.get('api/vendors');
    return response.data;
  }catch(e){
    console.log(e);
  }
}