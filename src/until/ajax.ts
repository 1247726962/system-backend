import axios from 'axios';

const Ajax = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 60000,
});
//请求拦截
Ajax.interceptors.request.use(config => {

  const token = localStorage.getItem('token');

  // if (!token) return Promise.reject(new Error('no token'))

  config.headers['Authorization'] = token; // 让每个请求携带自定义token 请        根据实际情况自行修改
  // config.headers['content-type'] = 'application/x-www-form-urlencoded';
  return config;

}, error => {

  return Promise.reject(error)

})
//响应拦截
Ajax.interceptors.response.use((response) => {

  // 对响应数据做点什么
  return response;

}, function (error) {
  
  const { response } = error;
  if (response!==undefined&&response.status == 500 && response.data === "token error") {
    window.location.hash = '/login'
    localStorage.removeItem("token");
  }
  // 对响应错误做点什么
  return Promise.reject(error);

});

export default Ajax