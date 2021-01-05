import {APIUrls} from '../helper/urls';
import { getFromBody } from '../helper/utils';
import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS } from './actionTypes';

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