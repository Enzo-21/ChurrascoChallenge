import { AUTH_SUCCESS, AUTH_FAIL, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "../actions/types"


const initialState = {
    token: localStorage.getItem('token'), 
    isAuthenticated: null, 
    loading: true, 
    user: null
}

export default function (state = initialState, action) {

    const { type, payload } = action

    switch (type) {

      
        case AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
            }

        
        case AUTH_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                ...payload,
                token: null, 
                isAuthenticated: false,
                loading: false
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.data)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGOUT:
        case LOGIN_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                ...payload,
                token: null, 
                isAuthenticated: false,
                loading: false
            }

        default: return state
    }
}