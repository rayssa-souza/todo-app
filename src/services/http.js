import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 2000,
});

const sucessResponse = ({ data }) => {
  return data;
};
const errorResponse = (error) => {
  throw error;
};

instance.interceptors.response.use(sucessResponse, errorResponse);

export default instance;
