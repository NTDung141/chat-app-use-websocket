import ACTIONS from "../actions";

const initialState = []

const MessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SEND_MESSAGE:
            return [
                ...state,
                action.payload.message
            ]

        case ACTIONS.FETCH_MESSAGE:
            state = action.payload.messageList
            return [
                ...state
            ]

        default:
            return state
    }
}

export default MessageReducer