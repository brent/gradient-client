import axios from 'axios';

const gvAxios = axios.create();

const BASE_URL = 'api/v1';

gvAxios.interceptors.request.use((request) => {
    const token = localStorage.getItem('access');

    console.log('request', request);

    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }

    if (request.method === 'post') {
      request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    return request;
  }, (error) => {
    return Promise.reject(error);
  }
);

gvAxios.interceptors.response.use((response) => {
    return response;
  },
  (error) => {
    console.log('error', error);
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
