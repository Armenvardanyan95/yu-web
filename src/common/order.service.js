import http from './http';

class OrderService {
    prefix = 'order';

    get fullPrefix() {
        return http.baseUrl + this.prefix;
    }

    async createOrder(orderData) {
        return await http.post(this.prefix, orderData);
    }

    async getMyOrders() {
        return await http.get(this.prefix);
    }
}

const orderService = new OrderService();
export default orderService;