import axios from 'axios';

const host = ((env) => {
  switch(env) {
    case 'development':
      return 'localhost';
    case 'production':
      return 'gradientapp.co';
    default:
      throw new Error('no environment specified');
      return null;
  }
})(process.env.NODE_ENV);

const port = '3000';
const apiRoute = 'api/v1';
const BASE_URL = ((host, port, apiRoute) => {
  if (!host || !apiRoute) { throw new Error('BASE_URL not set') }
  return (port !== null || port !== undefined)
    ? `http://${host}:${port}/${apiRoute}`
    : `http://${host}/${apiRoute}`;
})(host, port, apiRoute);

class API {
  async testRequest() {
    return await axios.get(BASE_URL);
  }

  async getAllUsers() {
    const res = await axios.get(`${BASE_URL}/users`);
    return res.data;
  }

  async getUser({ userId }) {
    const res = await axios.get(`${BASE_URL}/users/${userId}`);
    return res.data;
  }

  async logUserIn({ username, password }) {
    const logInParams = {
      'username': username,
      'password': password,
    }

    const res = await axios.post(`${BASE_URL}/auth/login`, logInParams);
    return res.data;
  }
}

export const api = new API();
