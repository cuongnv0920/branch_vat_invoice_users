import axiosClient from "api/axiosClient";
import contentType from "configs/contentTypeConf";

const configJson = {
  headers: contentType.headersJson,
};

export const levelApi = {
  create(data) {
    const url = "/level/create";
    return axiosClient.post(url, data, configJson);
  },

  getAll(params) {
    const url = "/level/getAll";
    return axiosClient.get(url, { params }, configJson);
  },

  get(id) {
    const url = `/level/get/${id}`;
    return axiosClient.get(url, id, configJson);
  },

  update(data) {
    const url = `/level/update/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },

  delete(data) {
    const url = `/level/delete/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },
};
