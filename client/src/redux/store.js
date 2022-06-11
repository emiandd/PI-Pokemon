import { createStore, applyMiddleware } from "redux";
import reducer from './reducer.js';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'

										// NOS PERMITE HACER PEDIDOS ASINCRONOS
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;