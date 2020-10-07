import {
  gvAxios as axios,
  BASE_URL,
} from './axiosConfig';

async function testRequest() {
  return await axios.get(`${BASE_URL}`);
}

async function getAllUsers() {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
}

async function getUser({ userId }) {
  const res = await axios.get(`${BASE_URL}/users/${userId}`);
  return res.data;
}

async function logUserIn({ email, password }) {
  const params = setPostBody({ email, password });
  const res = await axios.post(`${BASE_URL}/auth/login`, params);
  return res.data;
}

async function signUpUser({ email, password }) {
  const params = setPostBody({ email, password });
  const res = await axios.post(`${BASE_URL}/auth/signup`, params);
  return res.data;
}

async function getEntriesForUser() {
  const res = await axios.get(`${BASE_URL}/entries`);
  return res.data;
}

async function logEntryForUser({ entry, noteContent }) {
  const { sentiment, color, date } = entry;
  const params = setPostBody({ sentiment, color, noteContent, date });
  const res = await axios.post(`${BASE_URL}/entries`, params);
  return res.data;
}

function setPostBody(params) {
  let urlSearchParams = new URLSearchParams();
  const paramEntries = Object.entries(params);
  paramEntries.forEach(entry => urlSearchParams.append(entry[0], entry[1]));
  return urlSearchParams;
}

export {
  testRequest,
  getAllUsers,
  getUser,
  logUserIn,
  signUpUser,
  getEntriesForUser,
  logEntryForUser,
}
