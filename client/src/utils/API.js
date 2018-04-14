import axios from "axios";

export default {
  // Gets all books
  getUsers: function() {
    return axios.get("/api/user");
  },
  validate: function() {
    return axios.get("/api/user/validate");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/user/" + id);
  },
  getUserByNames: function(query) {
    return axios.get('/api/user/search/names/'+query)
  },
  login: function(data) {
    return axios.post("/api/user/login", data);
  },
  logout: function() {
    return axios.post("/api/user/logout");
  },
  update: function(data) {
    return axios.put('/api/user/'+data._id, data)
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
