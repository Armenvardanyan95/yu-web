import http from './http';

class UserService {
    prefix = 'user';

    get fullPrefix() {
        return http.baseUrl + this.prefix;
    }

    async signIn(credentials) {
        return await http.post(`${this.prefix}/signin`, credentials);
    }

    async signUp(userData) {
        return await http.post(this.prefix, userData);
    }

    async forgotPassword(email) {
        return await http.post(`${this.prefix}/forgot-password`, email);
    }

    async updateUser(userData) {
        return await http.post(`${this.prefix}/edit`, userData);
    }

    async getMyself() {
        return await http.get(`${this.prefix}/self`);
    }

    async updatePassword(passwords) {
        return await http.post(`${this.prefix}/update-password`, passwords);
    }

    async updateProfilePic(file) {
        const formData = new FormData();
        formData.append('file', file);
        return await http.post(`${this.prefix}/update-profile-pic`, formData);
    }
    
    async verify(token) {
        return await http.post(`${this.prefix}/verify`, {token});
    }
}

const userService = new UserService();
export default userService;