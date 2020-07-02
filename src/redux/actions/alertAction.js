import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from "uuid";

export const setAlert =  (title, msg, alertType) => async dispatch => {
    const id = uuidv4() 
   await dispatch({
        type: SET_ALERT,
        payload: {title, msg, alertType, id}
    })
    
    dispatch({
        type: REMOVE_ALERT,
        payload: id
    })
   
}