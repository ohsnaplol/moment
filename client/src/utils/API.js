import axios from "axios";

export default {
  // Gets all books
  getUsers: function() {
    return axios.get("/api/user");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/user/" + id);
  },
  login: function() {
    return axios.get("/api/user/login");
  },
  logout: function() {
    return axios.get("/api/user/logout");
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/user/" + id);
  },
  // Saves a user to the database
  createUser: function(userData) {
    return axios.post("/api/user", userData);
  }
};
