import axios from 'axios'

// This function will check if there's a token (comming from localStorage)
const setAuthToken = token => {
    if (token) {
         axios.defaults.headers.common['Authorization'] =`Bearer ${token}` 
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthToken