import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import * as actionTypes from './actionTypes';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/user/register", userData)
    .then(res => {
      // console.log(res)
      dispatch({
        type: actionTypes.SET_FLASH_MESSAGE,
        payload: res.data
      })
    })
    .catch(err =>
      console.log(err)
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios.post("/api/user/login", userData)
    .then(res => {
      if (res.data.success) {
        //Save to localStorage

        //Set token to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        //set token to Auth header
        setAuthToken(token);
        //Decode token to get user data
        const decoded = jwt_decode(token);
        //Set current user
        dispatch(setCurrentUser(decoded));
        dispatch({
          type: actionTypes.SET_FLASH_MESSAGE,
          payload: res.data
        })
      }
      else{
        dispatch({
          type: actionTypes.SET_FLASH_MESSAGE,
          payload: res.data
        })
      }
    })
    .catch(err => console.log(err))
}

export const setCurrentUser = decoded => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: decoded
  }
}

// User loading
export const setUserLoading = () => {
  return {
    type: actionTypes.USER_LOADING
  };
};

// Log user out
export const logoutUser = history => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));

  history.push("/");

};

export const resetFlash = () => {
  return {
    type: actionTypes.RESET_FLASH_MESSAGE
  }
}