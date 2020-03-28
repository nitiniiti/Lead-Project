import axios from 'axios';
import { returnErrors } from './messages';

import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';


// Load User
export const loadUser = () => (dispatch, getState) => {

    // User Loading
    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/user', tokenConfig(getState)).then((res) => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        })
    })
}


// REGISTER User
export const register = ({ username, email, password }) => (dispatch) => {

    //HEADERS
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }


    // Requested Body
    const body = JSON.stringify({ username: username, password: password, email: email })

    axios.post('/api/auth/register', body, config).then((res) => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: REGISTER_FAIL
        })
    })
}



// Login User
export const login = (username, password) => (dispatch) => {

    //HEADERS
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }


    // Requested Body
    const body = JSON.stringify({ username: username, password: password })

    axios.post('/api/auth/login', body, config).then((res) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: LOGIN_FAIL
        })
    })
}


// Logout User
export const logout = () => (dispatch, getState) => {

    axios.post('/api/auth/logout/', null, tokenConfig(getState)).then((res) => {
        dispatch({
            type: LOGOUT_SUCCESS
        });
    }).catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
    })
}


export const tokenConfig = getState => {
    // GET TOKEN FROM STATE
    const token = getState().auth.token;


    //HEADERS
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }


    // If Token add to Headers
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }

    return config
}