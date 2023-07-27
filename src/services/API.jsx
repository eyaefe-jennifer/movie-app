/** @format */

import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    // TODO: Utilize environment variables. Using throwaway account for now.
    config.headers[
      "Authorization"
    ] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzI5NzgyNTY5OTBjYjNlMjc4OTU2ZTMzM2ZmM2ZhMCIsInN1YiI6IjY0YmVlMjdlZjkxODNhMDBjNWI2NmM0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XBcPpGnG66p1x666HnK--e3BghLrftAWpQDPfkh4jvc`;
    return config;
  },
  (error) => {
    console.log("REQUEST ERROR");
    return Promise.reject(error);
  }
);

export default instance;
