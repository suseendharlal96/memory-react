import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://fond-memory.herokuapp.com/posts",
});
