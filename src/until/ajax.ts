import axios from 'axios';

const Ajax = axios.create({
  baseURL: '',
  timeout: 1000,


});

Ajax.interceptors.request.use(config => {

  const token = localStorage.getItem('token');

  if (!token) return Promise.reject(new Error('no token'))

  config.headers['Authorization'] = token; // 让每个请求携带自定义token 请        根据实际情况自行修改

  return config;

}, error => {

  return Promise.reject(error)

})

export default Ajax