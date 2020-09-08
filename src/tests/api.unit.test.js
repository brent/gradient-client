import * as api from '../api';
import {
  gvAxios as axios,
  BASE_URL,
} from '../api/axiosConfig.js';

jest.mock('../api/axiosConfig.js');

describe('api', () => {
  it('should exist', () => {
    expect(api).toBeDefined();
  });

  describe('testRequest()', () => {
    it('should be a function', () => {
      expect(typeof api.testRequest).toBe('function');
    });

    it('should call axios.get() with BASE_URL', async () => {
      const testRequestResponse = {
        message: "OK",
      };

      axios.get.mockResolvedValue(testRequestResponse);
      const result = await api.testRequest();
      const testRequestCall = axios.get.mock.calls[axios.get.mock.calls.length - 1];
      const testRequestCallValue = testRequestCall[0];
      expect(testRequestCallValue).toBe(BASE_URL);
    });
  });

  describe('getAllUsers()', () => {
    it('should be a function', () => {
      expect(typeof api.getAllUsers).toBe('function');
    });

    it('should call axios.get() with /users route', async () => {
      const getAllUsersResponse = [
        { id: 1, email: "a@b.c" },
        { id: 2, email: "b@c.a" },
      ];

      axios.get.mockResolvedValue(getAllUsersResponse);
      const result = await api.getAllUsers();
      const getAllUsersCall = axios.get.mock.calls[axios.get.mock.calls.length - 1];
      const getAllUsersCallValue = getAllUsersCall[0];
      expect(getAllUsersCallValue).toBe(`${BASE_URL}/users`);
    });
  });

  describe('getUser()', () => {
    it('should be a function', () => {
      expect(typeof api.getUser).toBe('function');
    });

    it('should call axios.getUser() with /users/:userId route', async () => {
      const getUserResponse = { id: "1", email: "a@b.c" };

      axios.get.mockResolvedValue(getUserResponse);
      const result = await api.getUser({ userId: getUserResponse.id });
      const getUserCall = axios.get.mock.calls[axios.get.mock.calls.length - 1];
      const getUserCallValue = getUserCall[0];
      expect(getUserCallValue).toBe(`${BASE_URL}/users/${getUserResponse.id}`);
    });
  });

  describe('logUserIn()', () => {
    it('should be a function', () => {
      expect(typeof api.logUserIn).toBe('function');
    });

    const userData = { email: "a@b.c", password: "password" };
    const logUserInResponse = { id: "1", email: userData.email };
    let logUserInCallValues;

    beforeAll(async () => {
      axios.post.mockResolvedValue(logUserInResponse);
      const result = await api.logUserIn({
        email: userData.email,
        password: userData.password,
      });
      logUserInCallValues  = axios.post.mock.calls[axios.post.mock.calls.length - 1];
    });

    it('should call axios.post() with /auth/login route', () => {
      expect(logUserInCallValues[0]).toBe(`${BASE_URL}/auth/login`);
    });

    it('should call axios.post() with correct params', () => {
      expect(logUserInCallValues[1].get('email')).toBe(userData.email);
      expect(logUserInCallValues[1].get('password')).toBe(userData.password);
    });
  });

  describe('signUpUser()', () => {
    it('should be a function', () => {
      expect(typeof api.signUpUser).toBe('function');
    });

    const userData = { email: "a@b.c", password: "password" };
    const signUpUserResponse = { id: "1", email: userData.email };
    let signUpUserCallValues;

    beforeAll(async () => {
      axios.post.mockResolvedValue(signUpUserResponse);
      const result = await api.signUpUser({
        email: userData.email,
        password: userData.password,
      });
      signUpUserCallValues = axios.post.mock.calls[axios.post.mock.calls.length - 1];
    });

    it('should call axios.post() with /auth/signup route', () => {
      expect(signUpUserCallValues[0]).toBe(`${BASE_URL}/auth/signup`);
    });

    it('should call axios.post() with correct params', () => {
      expect(signUpUserCallValues[1].get('email')).toBe(userData.email);
      expect(signUpUserCallValues[1].get('password')).toBe(userData.password);
    });
  });

  describe('getEntriesForUser()', () => {
    it('should be a function', () => {
      expect(typeof api.getEntriesForUser).toBe('function');
    });

    const getEntriesForUserResponse = [
      {
        id: 1, user_id: 1, color: '777777',
        sentiment: 50, note_id: 1, note_content: 'lorem ipsum',
      },
      {
        id: 2, user_id: 2, color: '777777', sentiment: 50,
        note_id: 2, note_content: 'lorem ipsum',
      },
    ];
    let getEntriesForUserCallValues;

    beforeAll(async () => {
      axios.post.mockResolvedValue(getEntriesForUserResponse);
      const result = await api.getEntriesForUser();
      getEntriesForUserCallValues = axios.get.mock.calls[axios.get.mock.calls.length - 1];
    });

    it('should call axios.get() with /entries route', () => {
      expect(getEntriesForUserCallValues[0]).toBe(`${BASE_URL}/entries`);
    });
  });

  describe('logEntryForUser()', () => {
    it('should be a function', () => {
      expect(typeof api.logEntryForUser).toBe('function');
    });

    const entryData = {
      id: 1, user_id: 1, color: '777777',
      sentiment: 50, note_id: 1, note_content: 'lorem ipsum',
    };
    let logEntryForUserCallValues;

    beforeAll(async () => {
      axios.post.mockResolvedValue(entryData);
      const result = await api.logEntryForUser({
        entry: {
          color: entryData.color,
          sentiment: entryData.sentiment,
        },
        noteContent: entryData.note_content,
      });
      logEntryForUserCallValues = axios.post.mock.calls[axios.post.mock.calls.length - 1];
    });

    it('should call axios.post() with /entries route', () => {
      expect(logEntryForUserCallValues[0]).toBe(`${BASE_URL}/entries`);
    });

    it('should call axios.post() with correct params', () => {
      expect(logEntryForUserCallValues[1].get('color')).toBe(entryData.color);
      expect(logEntryForUserCallValues[1].get('sentiment')).toBe(entryData.sentiment.toString());
      expect(logEntryForUserCallValues[1].get('noteContent')).toBe(entryData.note_content);
    });
  });
});
