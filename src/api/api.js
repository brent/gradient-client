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

  async logUserIn({ email, password }) {
    let params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);

    const res = await axios.post(`${BASE_URL}/auth/login`, params);
    return res.data;
  }

  async signUpUser({ email, password }) {
    let params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);

    console.log(params);
    const res = await axios.post(`${BASE_URL}/auth/signup`, params);
    return res.data;
  }

  async getEntriesForUser() {
    const res = await axios.get(`${BASE_URL}/entries`);
    return res.data;
  }

  async logEntryForUser({ entry, note }) {
    const { sentiment, color } = entry;

    let params = new URLSearchParams();
    params.append('sentiment', sentiment);
    params.append('color', color);
    if (note) { params.append('note', note) }

    const res = await axios.post(`${BASE_URL}/entries`, params);
    return res.data;
  }
}

export const api = new API();
