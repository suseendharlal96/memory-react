import axios from "axios";

export const axiosClient = axios.create({
  // baseURL: "https://fond-memory.herokuapp.com",
  baseURL: "http://localhost:5000",
});

console.log("axios");
