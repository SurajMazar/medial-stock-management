import axios from 'axios';


let metaElement:any = document.head.querySelector('meta[name="api-base-url"]');
const baseURL = metaElement?.content || "";

const instance = axios.create({
  baseURL:baseURL
})

export default instance;