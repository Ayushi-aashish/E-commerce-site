import { USER_LOGIN_REQUEST } from "../constants/userConstants.js";
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT ,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL,USER_REGISTER_REQUEST,
    USER_UPDATE_PROFILE_REQUEST,USER_UPDATE_PROFILE_SUCCESS,USER_UPDATE_PROFILE_FAIL,USER_UPDATE_RESET,
     USER_LIST_REQUEST,USER_LIST_SUCCESS,
    USER_LIST_FAIL,USER_LIST_RESET,USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from '../constants/userConstants.js';

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
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState(); 

    const response = await fetch('/api/users/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(user), 
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } else {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: data.message || 'Profile update failed',
      });
    }
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.message || 'Something went wrong',
    });
  }
  dispatch({ type: USER_UPDATE_RESET });
}
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState(); 

    const response = await fetch('/api/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data, 
      });
    } else {
      dispatch({
        type: USER_LIST_FAIL,
        payload: data.message || 'Failed to fetch users',
      });
    }
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.message || 'Something went wrong',
    });
  }
   dispatch({ type: USER_LIST_RESET });
} 
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: USER_DELETE_SUCCESS });
    } else {
      dispatch({
        type: USER_DELETE_FAIL,
        payload: data.message || 'User deletion failed',
      });
    }
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.message || 'Something went wrong',
    });
  }
};
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const response = await fetch(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Failed to fetch user');

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const response = await fetch(`/api/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'User update failed');

    dispatch({ type: USER_UPDATE_SUCCESS });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.message,
    });
  }
};









