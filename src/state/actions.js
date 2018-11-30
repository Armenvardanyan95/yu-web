export const SET_AUTH = 'SET_AUTH';
export const INCREMENT_MESSAGES_COUNT = 'INCREMENT_MESSAGES_COUNT';
export const DECREMENT_MESSAGES_COUNT = 'DECREMENT_MESSAGES_COUNT';
export const INCREMENT_NOTIFICATIONS_COUNT = 'INCREMENT_NOTIFICATIONS_COUNT';
export const SET_NOTIFICATIONS_COUNT = 'SET_NOTIFICATIONS_COUNT';
export const SET_LANGUAGE ='SET_LANGUAGE';
export const SET_USER = 'SET_USER';
export const UPDATE_ORDERS = 'UPDATE_ORDERS';

export function setAuth(auth) {
    return {type: SET_AUTH, auth};
}

export function setLanguage(lang) {
    return {type: SET_LANGUAGE, lang};
}

export function setUser(user) {
    return {type: SET_USER, user};
}

export function updateOrders() {
    return {type: UPDATE_ORDERS};
}