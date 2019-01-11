import http from './http';
import { socketService } from './socket';

class MessagesService {
    prefix = 'messages';

    get fullPrefix() {
        return http.baseUrl + this.prefix;
    }

    async getAllChats() {
        return await http.get(this.prefix);
    }

    async getMessages(chatID, page = 1) {
        return await http.get(`${this.prefix}/messages?chatID=${chatID}&page=${page}`);
    }

    async sendMessage(data) {
        return await http.post(this.prefix, data);
    }

    async markAsRead(id) {
        return await http.get(`${this.prefix}/mark-as-read/${id}`);
    }

    async uploadAttachment(formData) {
        return await http.post(`${this.prefix}/attachment`, formData);
    }

    connectToChat(chatID) {
        socketService.sendMessage('connectToChat', {chatID});
    }

    sendTyping(chatID) {
        socketService.sendMessage('typing', {chatID});
    }

    listenToMessages(chatID) {
        return socketService.listenTo('chats_' + chatID)
    }

    toggleOnline(status) {
        return socketService.sendMessage('toggle-online', {status});
    }
}

const messagesService = new MessagesService();
export { messagesService };
