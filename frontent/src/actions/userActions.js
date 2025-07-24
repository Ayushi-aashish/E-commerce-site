import { USER_LOGIN_REQUEST } from "../constants/userConstants.js";
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT ,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL,USER_REGISTER_REQUEST} from '../constants/userConstants.js';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
    
        // Simulate an API call
        const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
        } else {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: data.message || 'Login failed',
        });
        }
    } catch (error) {
        dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.message || 'Something went wrong',
        });
    }
    }
    export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });

    // Optionally, you can also reset the user state
    dispatch({ type: USER_LOGIN_SUCCESS, payload: null });
}
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        // Simulate an API call
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data,
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
        } else {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: data.message || 'Registration failed',
            });
        }
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.message || 'Something went wrong',
        });
    }
}
