import type { AuthData } from './auth.service';
import { AUTH_ENDPOINT } from './endpoints';
import axios from 'axios';

import store from '../../app/store';
import { setData } from '../../entities/userSlice';

const axiosInstance = axios.create({
  baseURL: AUTH_ENDPOINT,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user.data?.access_token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    config.headers['Access-Control-Allow-Origin'] = '*';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401) {
      if (!error?.request?.responseURL.includes('refresh-token')) {
        const refreshToken = store.getState().user.data?.refresh_token;
        if (refreshToken) {
          try {
            const res = await axiosInstance.post<AuthData>(`/auth/refresh-token`, {
              token: refreshToken,
            });
            store.dispatch(setData(res.data));
            originalRequest.headers['Authorization'] = `Bearer ${res.data.access_token}`;
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
