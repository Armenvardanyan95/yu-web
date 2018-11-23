import { createStore } from 'redux';

import { handleStateChange } from './reducers';

export const store = createStore(handleStateChange);