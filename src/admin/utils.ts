import axios from "axios";

export const API_SERVER = 'http://192.168.0.103:7000';

axios.defaults.baseURL = API_SERVER;
axios.interceptors.request.use(function (config) {
  const authInfo = localStorage.getItem('authInfo');
  if (authInfo) {
    config.headers.Authorization = `Token ${JSON.parse(authInfo).token}`;
  }

  return config;
});

export { axios };

export const validateEmail = (email: string) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
