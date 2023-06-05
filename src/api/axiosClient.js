import axios from "axios";
import api from "configs/api.conf";

const axiosClient = axios.create({
  baseURL: api.URL,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const { status, data } = error.response || {};

    if (status === 400) {
      const messageError = data;

      throw new Error(messageError.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
