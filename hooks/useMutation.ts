import { useState } from 'react';
import { AxiosRequestConfig, Method } from 'axios';
import qs from 'querystring';
import { client } from '@/config/axiosClient';
import { ApiError } from '@/types/client.types';

interface IProps<T> {
  endpoint: string;
  inputParams?: any;
  onSuccess?: (response: T) => void;
  onError?: (error: ApiError) => void;
}

interface AxiosOptions<T> {
  payload?: T;
  method: Method;
  config?: AxiosRequestConfig;
}

const useMutation = <T>({
  endpoint,
  inputParams,
  onSuccess,
  onError,
}: IProps<T>) => {
  const [isPending, setIsPending] = useState(false);

  let params = '';

  if (inputParams) {
    params = qs.stringify(inputParams);
  }

  if (params) {
    endpoint += '?' + params;
  }

  const mutationData = async <T extends {}>({
    payload,
    method,
    config,
  }: AxiosOptions<T>) => {
    setIsPending(true);

    try {
      const response = await client.request({
        url: endpoint,
        method,
        data: payload,
        ...config,
      });

      setIsPending(false);
      onSuccess && onSuccess(response.data);
    } catch (error: any) {
      setIsPending(false);
      onError && onError(error);
    }
  };

  return { isPending, mutationData };
};

export default useMutation;
