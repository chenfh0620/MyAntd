import axios from 'axios';
import { message } from 'antd';

export let Axios =axios.create({
  timeout: 10000, // 10秒超时
  headers: {
    'content-type': 'application/json'
  }
});

Axios.defaults.withCredentials = true;

// 配置发送请求拦截器
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
window.requestCancel = source.cancel;

Axios.interceptors.request.use(config => {
  config.cancelToken = source.token;
  return config;
}, err => {
  return Promise.reject(err);
});

Axios.interceptors.response.use(response => {
  return response;
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误（400）';
        break;
      case 401:
        err.message = '未授权（401）';
        break;
      case 403:
        err.message = '拒绝访问（403）';
        break;
      case 404:
        err.message = '服务不存在（404）';
        break;
      case 408:
        err.message = '请求超时（408）';
        break;
      case 500:
        err.message = '服务器错误（500）';
        break;
      case 501:
        err.message = '服务器未实现（501）';
        break;
      case 502:
        err.message = '网络错误（502）';
        break;
      case 503:
        err.message = '服务不可用（503）';
        break;
      case 504:
        err.message = '网络超时（504）';
        break;
      case 505:
        err.message = 'http版本不受支持（505）';
        break;
      default:
        err.message = `请求失败(${err.response.stauts})!`;
    }
  } else {
    err.message = '连接服务器失败！'
  }
  message.error(err.message);
  return Promise.reject(err);
});

export const getData = (url, params = {}) => {
  return Axios.get(url, { params });
};

export const postData = (url, params = {}) => {
  return Axios.post(url, params)
};

function getFormJson(obj) {
  let newData = new FormData();
  for (let i in obj) {
    if (obj[i] != null) {
      newData.append(i, obj[i]);
    }
  }
  return newData;
}
