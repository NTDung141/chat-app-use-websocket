import ACTIONS from "../actions";

const initialState = {
    chatBoxId: "",
    chattingUser: ""
}

const ChatBoxReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.CHANGE_CHAT_BOX:
            return {
                chatBoxId: action.payload.chatBoxId,
                chattingUser: action.payload.chattingUser
            }

        default:
            return state
    }
}

export default ChatBoxReducer