import ACTIONS from "../actions";

const initialState = {
    username: "",
    isLogged: false
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                username: action.payload.username,
                isLogged: true
            }

        case ACTIONS.LOGOUT:
            return {
                ...state,
                isLogged: false
            }

        default:
            return state
    }
}

export default AuthReducer