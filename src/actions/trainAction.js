import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getTrains = (url, obj, history) => {
    return dispatch => {
        axios.post(url, obj)
        .then(res => {
            dispatch({
                type: actionTypes.TRAINS_FOUND,
                data: res.data
            })
        history.push("/trains");
        })
    }
}