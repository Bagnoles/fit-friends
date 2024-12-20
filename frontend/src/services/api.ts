import axios, { AxiosError, AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';
import { getAccessToken, getRefreshToken } from './token';

type ErrorMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: false,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

const BASE_URL = 'http://localhost:3000/';
const TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = config.url?.includes('refresh') ? getRefreshToken() : getAccessToken();

      if (token && config.headers) {
        config.headers['authorization'] = `Bearer ${token}`;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const errorMessage = (error.response.data);
        toast.warn(errorMessage.message);
      }
      throw error;
    }
  );

  return api;
};
