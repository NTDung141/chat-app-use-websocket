import ACTIONS from "../actions";

const initialState = {
    chatBoxId: "",
    chattingUserId: ""
}

const ChatBoxReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.CHANGE_CHAT_BOX:
            return {
                chatBoxId: action.payload.chatBoxId,
                chattingUserId: action.payload.chattingUserId
            }

        default:
            return state
    }
}

export default ChatBoxReducer