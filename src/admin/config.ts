import axios from "axios";

export const API_SERVER = 'http://192.168.0.103:7000';

axios.defaults.baseURL = API_SERVER;

export { axios };
