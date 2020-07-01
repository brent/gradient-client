import axios from 'axios';

const host = ((env) => {
  switch(env) {
    case 'development':
      return 'localhost';
    case 'production':
      return 'gradientapp.co';
    default:
      throw new Error('no environment specified');
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

const gvAxios = axios.create();

gvAxios.interceptors.request.use((request) => {
    const token = localStorage.getItem('access');

    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }

    if (request.method === 'post') {
      request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    request.baseURL = BASE_URL;
    return request;
  }, (error) => {
    return Promise.reject(error);
  }
);

gvAxios.interceptors.response.use((response) => {
    return response;
  },
  (error) => {
    const resCode = error.response.status;
    const resErr = error.response.data.error;
    let originalReq = error.config;

    if (resCode === 403 && resErr === 'jwt expired') {
      const access = localStorage.getItem('access');
      const refreshToken = localStorage.getItem('refresh');

      return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/auth/token`, { 
          'access': access,
          'refreshToken': refreshToken,
        })
          .then(res => {
            const newAccessToken = res.data.access;
            const newRefreshToken = res.data.refresh;
            originalReq.headers['Authorization'] = `Bearer ${newAccessToken}`;
            localStorage.setItem('access', newAccessToken);
            localStorage.setItem('refresh', newRefreshToken);
            resolve(axios(originalReq));
          })
          .catch(err => {
            reject(new Error('could not refresh token'));
          });
      });
    }
  }
);

export {
  gvAxios,
  BASE_URL,
}
