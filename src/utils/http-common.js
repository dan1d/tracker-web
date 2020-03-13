import axios from 'axios';

/*
 * Set up a base ajax request with Axios
 * including the base url of the api
 * and an HTTP Authorization access token
 * to be automatically sent with every request
 * if the user is logged in
 */
const ajax = axios.create({
  baseURL: "http://localhost:3001",
});

// The interceptor here ensures that we check for the
// token in local storage every time an ajax request is made

function success(config) {
  const token = localStorage.getItem('token');
  if (token && token !== 'undefined') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

function error(err) {
  localStorage.setItem('token', null);
  return Promise.reject(err);
}

ajax.interceptors.request.use(success, error);
export default ajax;
