import * as actionTypes from '../actions/actionTypes';

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  flashMessage: "",
  flash: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case actionTypes.USER_LOADING:
      return {
        ...state,
        loading: true
      }
    case actionTypes.SET_FLASH_MESSAGE :
      console.log(action);
      return{
        ...state,
        flashMessage: action.payload.flashMessage,
        flash:true
      }
    case actionTypes.RESET_FLASH_MESSAGE :
      return{
        ...state,
        flashMessage: "",
        flash: false
      }
    default:
      return state;
  }
}