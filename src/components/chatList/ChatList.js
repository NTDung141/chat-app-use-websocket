import "./ChatList.css"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import * as messageAction from "../../redux/actions/MessageAction"
import * as chatBoxAction from "../../redux/actions/ChatBoxAction"

function ChatList() {
    const myUser = useSelector(state => state.AuthReducer.user)
    const chatBoxList = myUser.chatBoxList
    const contactUserList = myUser.contactUserList

    const dispatch = useDispatch()

    const handleClick = async (chatBoxId, chattingUserId) => {
        dispatch(chatBoxAction.dispatchChangeChatBoxId(chatBoxId, chattingUserId))
        const res = await axios.get(`/message/${chatBoxId}`)
        dispatch(messageAction.dispatchFetchMessage(res.data))
    }

    const getChattingUserId = (userIdList) => {
        var chattingUserId = ""
        userIdList.forEach(userId => {
            if (userId !== myUser.id) {
                chattingUserId = userId
            }
        });
        return chattingUserId
    }

    const getChattingUsername = (userId) => {
        var chattingUsername = ""
        contactUserList.forEach(user => {
            if (user.id === userId) {
                chattingUsername = user.refName
            }
        })

        return chattingUsername
    }

    const showChatBoxList = () => {
        const result = chatBoxList.map((item, index) => {
            const chattingUserId = getChattingUserId(item.userIdList)
            const chattingUsername = getChattingUsername(chattingUserId)

            return (
                <div className="chatbox-item" key={index} onClick={() => handleClick(item.id, chattingUserId)}>
                    <div className="chatbox-item__avatar">
                        {chattingUsername.slice(0, 1)}
                    </div>

                    <div className="chatbox-item__content">
                        <div className="chatbox-item__name">
                            {chattingUsername}
                        </div>

                        <div> say something... </div>
                    </div>
                </div>
            )
        })

        return result
    }

    return (
        <div className="chatbox-list">
            {showChatBoxList()}
        </div>
    )
}

export default ChatList