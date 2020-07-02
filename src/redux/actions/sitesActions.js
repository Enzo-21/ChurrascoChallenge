import axios from "axios"
import { GET_SITES, GET_SITES_FAIL } from "./types";

export const getSites = () => async dispatch => {
   
      try {
         const res = await axios.get('https://cors-anywhere.herokuapp.com/http://churrasco.mooo.com:3005/api/sites')
         
         await dispatch({
             type: GET_SITES,
             payload: res.data
         })
     } catch (error) {
         dispatch({
             type: GET_SITES_FAIL,
             payload: {error}
         })
     }  


}