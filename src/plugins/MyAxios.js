import axios from 'axios';

const MyAxios = {};
MyAxios.install = function (Vue) {
  // axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  const instance = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
  });
  // 拦截器
  // Add a request interceptor
  instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log(config.headers);
    // console.log(config.url);
    if (config.url.toLocaleLowerCase() !== 'login') {
      // 设置token
      const token = sessionStorage.getItem('token');
      config.headers.Authorization = token;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
  Vue.prototype.$http = instance;
};

export default MyAxios;
