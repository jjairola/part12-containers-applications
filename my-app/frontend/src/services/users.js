import axios from "../utils/apiClient";
const baseUrl = "/api/users";

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

const isTokenSet = () => !!token;

export default {
  getAll,
  setToken,
  isTokenSet,
};
