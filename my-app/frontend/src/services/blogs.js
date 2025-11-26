import axios from "../utils/apiClient";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const config = () => {
  return {
    ...(token ? { headers: { Authorization: token } } : {}),
  };
};

const getAll = () => {
  const request = axios.get(baseUrl, config());
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config());
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, config());
  return request.then((response) => response.data);
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config());
  return response.data;
};

const isTokenSet = () => !!token;

export default {
  getAll,
  create,
  update,
  setToken,
  delete: deleteBlog,
  isTokenSet,
};
