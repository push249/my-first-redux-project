import { createStore } from 'redux';
import reducer from './reducer.js'; // Don't need to wrap in {} if it is default

const store = createStore(reducer);

export default store;
