import * as actionTypes from '../actions/actionTypes';

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  flashMessage: "",
  flash: false,
  success: false
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
      if(action.payload.success){
        return{
          ...state,
          flashMessage: action.payload.flashMessage,
          flash:true,
          success: action.payload.success
        }
      }
      else{
        return {
          ...state,
          flashMessage: action.payload.flashMessage,
          flash: true,
          success: action.payload.success
        }
      }
    case actionTypes.RESET_FLASH_MESSAGE :
      return{
        ...state,
        flashMessage: "",
        flash: false,
        success: false
      }
    default:
      return state;
  }
}