import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3001",
// });

export default {
  // Gets the user with the given id
  getSurfer: function(id) {
    return axios.get("/api/surfers/" + id);
  },
  login: function(user) {
    return axios.post("/api/login/", user);
  }
};