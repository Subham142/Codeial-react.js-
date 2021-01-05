import {APIUrls} from '../helper/urls';
import { getFromBody } from '../helper/utils';

import { AUTHENTICATE_USER, LOGIN_FAILED,
     LOGIN_START,
      LOGIN_SUCCESS, LOG_OUT, 
      SIGNUP_FAILED, SIGNUP_START, 
      SIGNUP_SUCCESS } from './actionTypes';

export function startLogin() {
    return {
        type : LOGIN_START,
    };
}

export function loginFailed(errorMessage) {
    return {
        type : LOGIN_FAILED,
        error: errorMessage,
    };
}

export function loginSuccess(user) {
    return {
        type : LOGIN_SUCCESS,
        user,
    };
}

export function login(email, password){
    return(dispatch) => {
        dispatch(startLogin());
        const url = APIUrls.login();
        fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: getFromBody({email, password}),
        })

        .then((response)=> response.json())
        .then((data) => {
            if(data.success){
                dispatch(loginSuccess(data.data.user));
                return;
            } 
            dispatch(loginFailed(data.message));
        });
    };
}

//Authentication 
export function authenticateUser(user){
    return{
        type: AUTHENTICATE_USER,
        user,
    };
}

export function logoutUser(){
    return{
        type: LOG_OUT,
    }
}

//SignUp
export function signup(email, password, confirmPassword, name) {
    return (dispatch) => {
        const url =APIUrls.signup();
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: getFromBody({
                email,
                password,
                confirm_password: confirmPassword,
                name,
            }),
        })
        .then((response) => response.json())
        .then((data)=> {
            if(data.success){
                localStorage.setItem('token', data.data.token);
                dispatch(signupSuccessful(data.data.user));
                return;
            }
            dispatch(signupFailed(data.message));
        })
    }
}

export function startSingup(){
    return{
        type: SIGNUP_START,
    }
}

export function signupFailed(error){
    return{
        type: SIGNUP_FAILED,
    }
}

export function signupSuccessful(){
    return{
        type: SIGNUP_SUCCESS,
    }
}