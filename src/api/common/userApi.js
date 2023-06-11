import axiosClient from "api/axiosClient";
import contentType from "configs/contentTypeConf";

const configJson = {
  headers: contentType.headersJson,
};

export const userApi = {
  create(data) {
    const url = "/user/create";
    return axiosClient.post(url, data, configJson);
  },

  getAll(params) {
    const url = "/user/getAll";
    return axiosClient.get(url, { params }, configJson);
  },

  get(id) {
    const url = `/user/get/${id}`;
    return axiosClient.get(url, id, configJson);
  },

  update(data) {
    const url = `/user/update/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },

  delete(data) {
    const url = `/user/delete/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },
};
