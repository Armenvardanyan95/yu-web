import { Subject, } from 'rxjs';

class NotificationsService {
    onMessage = new Subject();

    success(message, toBeTranslated = true) {
        this.onMessage.next({variant: 'success', message, toBeTranslated});
    }

    warning(message, toBeTranslated = true) {
        this.onMessage.next({variant: 'warning', message, toBeTranslated});
    }

    info(message, toBeTranslated = true) {
        this.onMessage.next({variant: 'info', message, toBeTranslated});
    }

    error(message, toBeTranslated = true) {
        this.onMessage.next({variant: 'error', message, toBeTranslated});
    }
}

const notificationService = new NotificationsService();
export default notificationService;