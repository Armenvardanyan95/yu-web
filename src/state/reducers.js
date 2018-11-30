import { SET_AUTH, SET_LANGUAGE, SET_USER, UPDATE_ORDERS } from './actions';

const initialState = {
    isAuth: false,
    lang: 'en',
    user: null,
};


export function handleStateChange(state = initialState, action) {
    switch (action.type) {
        case SET_AUTH:
            return {...state, isAuth: action.auth};
        case SET_LANGUAGE:
            return {...state, lang: action.lang};
        case SET_USER:
            return {...state, user: action.user};
        case UPDATE_ORDERS:
            return state;
        default:
            return state;
    }
}