import { createStore } from 'redux';
import reducer from '../reducers/reducer'

const store = createStore(reducer);
// console.log(store.getState())

export default store;