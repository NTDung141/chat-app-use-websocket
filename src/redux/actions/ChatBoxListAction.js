import ACTIONS from "./index";

export const dispatchAddNewChatBox = (newChatBox) => {
    return {
        type: ACTIONS.ADD_CHATBOX,
        payload: {
            newChatBox
        }
    }
}

export const dispatchAddNewMessageToChatBox = (newMessage) => {
    return {
        type: ACTIONS.ADD_NEW_MESSAGE_TO_CHATBOX,
        payload: {
            newMessage
        }
    }
}

export const dispatchFetchChatBox = (chatBoxList) => {
    return {
        type: ACTIONS.FETCH_CHATBOX,
        payload: {
            chatBoxList
        }
    }
}