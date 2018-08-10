import axios, { AxiosPromise } from 'axios';
import { API_ENDPOINT } from './api.config';

export function refreshToken(): AxiosPromise<any> {
  return axios.post(`${API_ENDPOINT}/refresh`, {});
}

