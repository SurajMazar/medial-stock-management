import axios from 'axios';

const baseURL = document.head.querySelector('meta[name="api-base-url"]').content;

const instance = axios.create({
  baseURL:baseURL
})

export default instance;