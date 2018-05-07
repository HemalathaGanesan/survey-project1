import { createStore } from 'redux';
import reducer from '../reducers/reducer'

const store = createStore(reducer);
console.log(store.getState())

store.subscribe(() => {
    console.log("data updated", store.getState())
})
export default store;