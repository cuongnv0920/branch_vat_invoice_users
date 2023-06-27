import axiosClient from "api/axiosClient";
import contentType from "configs/contentTypeConf";

const configJson = {
  headers: contentType.headersJson,
};
const configFormData = {
  headers: contentType.headersFormData,
};

export const invoiceApi = {
  xmlRead(data) {
    const url = "/invoice/xmlRead";
    return axiosClient.post(url, data, configFormData);
  },

  create(data) {
    const url = "/invoice/create";
    return axiosClient.post(url, data, configFormData);
  },

  getAll(params) {
    const url = "/invoice/getAll";
    return axiosClient.get(url, { params }, configJson);
  },

  get(id) {
    const url = `/invoice/get/${id}`;
    return axiosClient.get(url, id, configJson);
  },

  update(data) {
    const url = `/invoice/update/${data.id}`;
    return axiosClient.put(url, data, configFormData);
  },

  delete(data) {
    const url = `/invoice/delete/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },
};
