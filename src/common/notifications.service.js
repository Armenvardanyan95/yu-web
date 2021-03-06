import { socketService } from './socket';
import { store } from '../state/store';

class NotificationsService {
    getNotifications() {
        socketService.sendMessage('getNotifications')
    }

    deleteNotification(id) {
        socketService.sendMessage('deleteNotification', {id});
    }

    markAsRead(id) {
        socketService.sendMessage('markAsRead', {id});
    }

    subscribeToNotifications(cb) {
        socketService.listenTo('onNotifications').subscribe(cb);
    }

    subscribeToNewNotification(cb) {
        const state = store.getState();
        socketService.listenTo('notifications_' + state.user.id).subscribe(cb);
    }

    unsubscribeFromNewNotifications() {
        socketService.unsubscribe('onNotifications');
    }
}

const notificationsService = new NotificationsService();

export { notificationsService };