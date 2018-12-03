import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:9000');

class SocketService {

    get token() {
        return localStorage.getItem('token') || null;
    };

    buildData(data) {
        return this.token ? {token: this.token, data} : {data};
    }

    sendMessage(handler, data = {}) {
        const send = this.buildData(data);
        console.log('apchi', send);
        socket.emit(handler, send);
    }

    listenTo(notificationName) {
        console.log('vitolo jan, inch ka?', notificationName);
        return {subscribe: cb => socket.on(notificationName, cb)};
    }

    unsubscribe(channelName) {
        socket.removeListener(channelName);
    }
}

const socketService = new SocketService();

export { socketService };
