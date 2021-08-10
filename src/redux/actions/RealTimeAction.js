import ACTIONS from "./index";

export const dispatchReceiveMessage = (receivedMessage) => {
    return {
        type: ACTIONS.RECEIVE_MESSAGE,
        payload: {
            receivedMessage: receivedMessage
        }
    }
}