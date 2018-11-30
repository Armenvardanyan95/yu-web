import { socketService } from './socket';
import { store } from '../state/store';

class NotificationsService {
    getNotifications() {
        socketService.sendMessage('getNotifications')
    }

    subscribeToNotifications(cb) {
        socketService.listenTo('onNotifications').subscribe(cb);
    }

    subscribeToNewNotification(cb) {
        const state = store.getState();
        console.log('state', state)
        socketService.listenTo('notifications_' + state.user.id).subscribe(cb);
    }
}

const notificationsService = new NotificationsService();

export { notificationsService };