export const loginService = {
  async authenticate(_username: string, _password: string) {
    // API call to authenticate
    return { token: 'fake-token' };
  },
};