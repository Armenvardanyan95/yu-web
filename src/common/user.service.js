import http from './http';

class UserService {
    prefix = 'user';
    async signIn(credentials) {
        return await http.post(`${this.prefix}/signin`, credentials);
    }

    async signUp(userData) {
        return await http.post(`${this.prefix}/signup`, userData);
    }

    async forgotPassword(email) {
        return await http.post(`${this.prefix}/forgot-password`, email);
    }
}

const userService = new UserService();
export default userService;