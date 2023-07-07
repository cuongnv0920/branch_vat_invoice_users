import axios from "axios";

const axiosClient = axios.create();

const configPath = process.env.PUBLIC_URL + "/config.txt";

axiosClient.interceptors.request.use(
  async (config) => {
    const response = await fetch(configPath);
    const text = await response.text();
    const lines = text.split("\n");
    const configObj = {};
    lines.forEach((line) => {
      const [key, value] = line.split("=");
      configObj[key.trim()] = value.trim();
    });

    config.baseURL = configObj.SERVER_API_IP;
    return config;
  },
  (error) => {
    console.error("Đã xảy ra lỗi khi đọc tệp config.txt:", error);
    return Promise.reject(error);
  }
);

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
