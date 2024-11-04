import axios from 'axios';
// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Base URL for your API
});

// Add a request interceptor to include JWT in all outgoing requests
axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
