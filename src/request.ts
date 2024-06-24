import { message as antMessage } from "antd";
import axios, { AxiosError, CreateAxiosDefaults } from "axios";
import qs from "qs";

// https://github.com/axios/axios

export const axiosDefaults: CreateAxiosDefaults = {
  // baseURL: '',
  withCredentials: true,
  paramsSerializer: {
    encode: (value) => qs.parse(value),
    serialize: (params) => qs.stringify(params),
  },
};

export const request = axios.create(axiosDefaults);

export const CODE_UNAUTHORIZED = 401; // 没有权限

export type ErrorResponseData = {
  code: number;
  errors: Record<string, string[]>;
  message: string;
};

export const errorHandler = async (
  error: AxiosError<ErrorResponseData, any>
) => {
  console.error(error);
  const { response, config } = error;
  let message = "请求错误";
  let data = response?.data;
  if (data instanceof Blob) {
    data = JSON.parse(await data?.text());
  }
  if (data?.message) {
    message = data.message;
  }

  antMessage.error(message);

  return Promise.reject(error);
};

export const defaultResponseInterceptor = request.interceptors.response.use(
  null,
  errorHandler
);

export const getData = <Data extends unknown = any>(
  url: string,
  params?: Record<string, any>
) => request.get<{ data: Data }>(url, { params }).then((res) => res.data?.data);

export const postData = <Data extends unknown = any>(
  url: string,
  data?: Record<string, any>
) => request.post<Data>(url, data).then((res) => res?.data);
