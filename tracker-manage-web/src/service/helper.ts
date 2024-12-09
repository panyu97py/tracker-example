import axios, {AxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import {ResponseData} from "@/service/types";
import {message as antdMessage} from "antd";

const axiosInstance = axios.create({
  baseURL: '/', // 默认的基础 URL
  timeout: 10000,                    // 设置请求超时，单位是毫秒
  headers: {
    'Content-Type': 'application/json',
    // 你可以在这里添加其他的默认请求头
  },
});

const handleFulfilled = (response: AxiosResponse<ResponseData>) => {
  const {data, message, success} = response.data;
  // 对响应数据进行处理
  if (success) return data

  antdMessage.error(message)

  return Promise.reject(new Error(message))
}

const handleRejected = (error: AxiosError<ResponseData>) => {
  const {message} = error.response?.data || {};

  if (message) antdMessage.error(message);

  return Promise.reject(error);  // 返回错误，后续处理
}

// 响应拦截器
axiosInstance.interceptors.response.use(handleFulfilled, handleRejected);

// 定义服务函数
const defineService = <T = any, D = any>(defineConfig: AxiosRequestConfig<D>) => {
  return (data: D): Promise<T> => {
    const patchConfig =  defineConfig.method==='get' ? {params: data} : {data}
    console.log({patchConfig})
    return axiosInstance({...defineConfig, ...patchConfig});
  };
};

export const serviceHelper = Object.assign(axiosInstance, {define: defineService})