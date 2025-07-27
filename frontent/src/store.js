import {legacy_createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productListReducer, productDetailsReducer, } from './reducers/productReducers.js';
import { cartReducer } from './reducers/cartReducers.js';
import { userLoginReducer ,userRegisterReducer} from './reducers/userReducer.js';
import { orderCreateReducer,orderDetailsReducer,orderPayReducer } from './reducers/orderReducers.js';

const reducer = combineReducers({
    productList: productListReducer,
     productDetails: productDetailsReducer,
     cart: cartReducer, 
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
          orderCreate: orderCreateReducer,
          orderDetails: orderDetailsReducer,
          orderPay:orderPayReducer
});
const cartItemFromStorage = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod') : '';
const initialState = {
    cart: { cartItems: cartItemFromStorage,
        shippingAddress:shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
     },
    userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = legacy_createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;