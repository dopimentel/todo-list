import axios from 'axios';

const HOST = process.env.REACT_APP_API_HOST || 'localhost';
const DEFAULT_PORT = 3001;
const PORT = process.env.REACT_APP_API_PORT || DEFAULT_PORT;

const fetch = axios.create({
  baseURL: `http://${HOST}:${PORT}`,
  timeout: 3000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const tasksApi = async (method, endpoint, body) => fetch
  .request({ method, url: endpoint, data: body })
  .then(({ status, data }) => ({ status, data }));

export default tasksApi;
