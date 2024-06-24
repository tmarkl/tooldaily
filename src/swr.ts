import { type AxiosRequestConfig } from "axios";
import useSWR, { type Key, type SWRConfiguration } from "swr";
import useSWRMutation, { type SWRMutationConfiguration } from "swr/mutation";
import { request } from "./request";

// https://swr.vercel.app/docs/api

export const swrRequest = async (key: any) => {
  const c = Array.isArray(key)
    ? { url: key[0], params: key[1], method: "GET" }
    : key;
  return request(c).then((res) => res.data);
};

export const useSwrGetData = (key: Key, config?: SWRConfiguration) => {
  return useSWR(key, {
    fetcher: swrRequest,
    keepPreviousData: true,
    revalidateOnFocus: false,
    errorRetryCount: 0,
    onError: (e) => {
      console.error("[useSwrGetData]", e);
    },
    ...config,
  });
};

export const swrMutRequest = async (
  a: string | AxiosRequestConfig,
  { arg }: any
) => {
  const url = typeof a === "string" ? a : a.url || "";
  const c = a && typeof a === "object" ? { ...a } : {};
  if (arg && typeof arg === "object") {
    const dataKey =
      !c.method || c.method.toLowerCase() === "get" ? "params" : "data";
    c[dataKey] = Array.isArray(arg)
      ? arg
      : {
          ...c[dataKey],
          ...arg,
        };
  }
  return request(url, c).then((res) => res.data);
};
