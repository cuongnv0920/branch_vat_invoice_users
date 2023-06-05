import axiosClient from "api/axiosClient";
import contentType from "configs/contentTypeConf";

const configJson = {
  headers: contentType.headersJson,
};

export const authApi = {
  login(data) {
    const url = "/auth/login";
    return axiosClient.post(url, data, configJson);
  },
};
