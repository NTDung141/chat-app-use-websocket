import ACTIONS from "../actions";

const initialState = []

const ChatBoxListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.FETCH_CHATBOX:
            return action.payload.chatBoxList

        case ACTIONS.ADD_CHATBOX:
            let addNewItemChatBoxList = state

            addNewItemChatBoxList.unshift(action.payload.newChatBox)

            return addNewItemChatBoxList

        case ACTIONS.ADD_NEW_MESSAGE_TO_CHATBOX:
            const newMessage = action.payload.newMessage

            let indexOfChatBox = -1

            let newChatBoxList = state.map((chatBox, index) => {
                if (chatBox.id === newMessage.chatBoxId) {
                    indexOfChatBox = index
                    return { ...chatBox, lastMessage: newMessage }
                }
                else {
                    return chatBox
                }
            }

            )

            if (indexOfChatBox !== -1) {
                let chatBox = newChatBoxList[indexOfChatBox]
                newChatBoxList.splice(indexOfChatBox, 1)
                newChatBoxList.unshift(chatBox)
            }

            return newChatBoxList

        default:
            return state
    }
}

export default ChatBoxListReducer