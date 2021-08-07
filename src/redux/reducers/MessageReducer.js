import ACTIONS from "../actions";

const initialState = []

const MessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SEND_MESSAGE:
            return [
                ...state,
                action.payload.message
            ]

        default:
            return state
    }
}

export default MessageReducer