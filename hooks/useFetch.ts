import { useState, useEffect, useCallback } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import qs from 'querystring';
import { client } from '@/config/axiosClient';

interface IProps {
  endpoint: string;
  inputParams?: any;
  enabled?: boolean;
  onSuccess?: (response: AxiosResponse<any, any>) => void;
  onError?: (error: AxiosError) => void;
}

const useFetch = <T>({
  endpoint,
  inputParams,
  enabled = true,
  onSuccess,
  onError,
}: IProps) => {
  const [data, setData] = useState<T>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  let params = '';

  if (inputParams) {
    params = qs.stringify(inputParams);
  }

  if (params) {
    endpoint += '?' + params;
  }

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    setError(null);

    try {
      const response = await client.get(endpoint);
      const data = response.data.data;

      setIsFetching(false);
      setData(data);
      onSuccess && onSuccess(response);
    } catch (error: any) {
      setError(error);
      setIsFetching(false);
      onError && onError(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled, fetchData]);

  return { data, isFetching, error, refetch: fetchData };
};

export default useFetch;
