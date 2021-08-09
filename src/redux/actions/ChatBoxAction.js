import ACTIONS from "./index";

export const dispatchChangeChatBoxId = (chatBoxId, chattingUserId) => {
    return {
        type: ACTIONS.CHANGE_CHAT_BOX,
        payload: {
            chatBoxId: chatBoxId,
            chattingUserId: chattingUserId
        }
    }
}