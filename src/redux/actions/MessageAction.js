import ACTIONS from "./index";

export const dispatchSendMessage = (message) => {
    return {
        type: ACTIONS.SEND_MESSAGE,
        payload: {
            message: message
        }
    }
}

export const dispatchFetchMessage = (messageList) => {
    return {
        type: ACTIONS.FETCH_MESSAGE,
        payload: {
            messageList: messageList
        }
    }
}