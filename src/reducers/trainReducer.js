import * as actionTypes from '../actions/actionTypes';

const initialState = {
    trainList:[]
}

const trainReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.TRAINS_FOUND :
            return {
                ...state,
                trainList: action.data
            }
        default:
            return state;
    }
}

export default trainReducer;