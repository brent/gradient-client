import {
  gvAxios as axios,
  BASE_URL,
} from './axiosConfig';

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
    let params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const res = await axios.post(`${BASE_URL}/auth/login`, params);
    return res.data;
  }

  async getEntriesForUser() {
    const res = await axios.get(`${BASE_URL}/entries`);
    return res.data;
  }
}

export const api = new API();
