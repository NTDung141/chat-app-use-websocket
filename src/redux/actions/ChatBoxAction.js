import ACTIONS from "./index";

export const dispatchChangeChatBoxId = (chatBoxId, chattingUser) => {
    return {
        type: ACTIONS.CHANGE_CHAT_BOX,
        payload: {
            chatBoxId: chatBoxId,
            chattingUser: chattingUser
        }
    }
}