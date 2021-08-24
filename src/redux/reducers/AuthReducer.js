import ACTIONS from "../actions";

const initialState = {
    user: {
        id: "",
        username: "",
        refName: "",
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
            return {
                ...state,
                isLogged: false
            }

        case ACTIONS.ADD_CHATBOX_CONTACT:
            return {
                ...state,
                user: {
                    ...state.user,
                    chatBoxList: action.payload.newChatBoxList,
                    contactUserList: action.payload.newContactList
                }
            }

        default:
            return state
    }
}

export default AuthReducer