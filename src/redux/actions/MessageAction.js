import ACTIONS from "./index";

export const dispatchSendMessage = (message) => {
    return {
        type: ACTIONS.SEND_MESSAGE,
        payload: {
            message: message
        }
    }
}