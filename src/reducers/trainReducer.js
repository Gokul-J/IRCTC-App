import * as actionTypes from '../actions/actionTypes';

const initialState = {
    trainList:[],
    yyyy: Number,
    mm: Number,
    dd: Number
}

const trainReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.TRAINS_FOUND :
            return {
                ...state,
                trainList: action.data
            }
        case actionTypes.SET_DATE :
            return {
                ...state,
                yyyy: action.data.year,
                mm: action.data.month,
                dd: action.data.day
            }
        default:
            return state;
    }
}

export default trainReducer;