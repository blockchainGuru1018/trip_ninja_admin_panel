import axios from "axios";

export const API_SERVER = 'http://192.168.0.103:7000';

axios.defaults.baseURL = API_SERVER;

export { axios };

export const validateEmail = (email: string) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
