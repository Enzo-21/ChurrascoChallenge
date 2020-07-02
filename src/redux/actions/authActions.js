import axios from "axios"
import { AUTH_FAIL, AUTH_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./types";
import setAuthToken from "../../utils/setAuthToken";

// Authenticate a user
export const authUser = () => async dispatch => {
    
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

      try {
          // Since the API doesn't provide a GET method to /api/auth I used /api/sites to determine if the user is authenticated.
         const res = await axios.get('https://cors-anywhere.herokuapp.com/http://churrasco.mooo.com:3005/api/sites')
         
         dispatch({
             type: AUTH_SUCCESS,
             payload: res.data
         })
     } catch (error) {
         dispatch({
             type: AUTH_FAIL,
             payload: {error}
         })
     }  


}

// Login user
export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post('https://cors-anywhere.herokuapp.com/http://churrasco.mooo.com:3005/api/auth', body, config)

        const { data } = res

        dispatch({
            type: LOGIN_SUCCESS,
            payload: { data }
        })
      dispatch(authUser())
    } catch (err) {

        const errors = [err.message];


        dispatch({
            type: LOGIN_FAIL,
            payload: { errors }
        })
    }
}

// Logout
export const logout = () => async dispatch =>{
    dispatch({
        type: LOGOUT
    })
}