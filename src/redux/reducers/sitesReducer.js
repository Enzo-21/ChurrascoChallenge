import { GET_SITES, GET_SITES_FAIL} from "../actions/types"

const initialState = {
    loading: true,
    sites: []
}

export default function (state = initialState, action) {

    const { type, payload } = action

    switch (type) {

        case GET_SITES:
            return {
                ...state,
                ...payload,
                loading: false,
            }

        
        case GET_SITES_FAIL:
            return {
                ...state,
                ...payload,
                loading: false
            }

        default: return state
    }
}