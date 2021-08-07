import ACTIONS from "../actions";

const initialState = {
    user: {
        id: "",
        username: "",
        refName: ""
    },
    isLogged: false
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                user: action.payload.user,
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