import axios from "axios"

axios.defaults.withCredentials = false;

const request = axios.create({
  baseURL: "http://172.26.130.106:5984",
  timeout: 10000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    }
}
)

export default request