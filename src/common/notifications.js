import { Subject, } from 'rxjs';

class NotificationsService {
    onMessage = new Subject();

    success(message) {
        this.onMessage.next({variant: 'success', message});
    }

    warning(message) {
        this.onMessage.next({variant: 'warning', message});
    }

    info(message) {
        this.onMessage.next({variant: 'info', message});
    }

    error(message) {
        this.onMessage.next({variant: 'error', message});
    }
}

const notificationService = new NotificationsService();
export default notificationService;