import ACTIONS from "../actions";

const initialState = {
    user: {
        id: "",
        username: "",
        firstName: "",
        lastName: "",
        chatBoxList: [],
        contactUserList: []
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
            return initialState

        case ACTIONS.ADD_CONTACT:
            return {
                ...state,
                user: {
                    ...state.user,
                    contactUserList: action.payload.newContactList
                }
            }

        default:
            return state
    }
}

export default AuthReducer