import "./ChatList.css"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import * as messageAction from "../../redux/actions/MessageAction"
import * as chatBoxAction from "../../redux/actions/ChatBoxAction"
import * as realTimeAction from "../../redux/actions/RealTimeAction"
import { useEffect } from "react"
import messageApi from "../../enum/apis/message/message-api"
import headerToken from "../../enum/headerWithToken/header-token"

function ChatList() {
    const myUser = useSelector(state => state.AuthReducer.user)
    const chatBoxList = useSelector(state => state.ChatBoxListReducer)
    const contactUserList = myUser.contactUserList
    const receivedMessage = useSelector(state => state.RealTimeReducer.receivedMessage)
    const chatBoxId = useSelector(state => state.ChatBoxReducer.chatBoxId)

    const dispatch = useDispatch()

    const handleClick = async (chatBoxId, chattingUserId) => {
        const chattingUser = myUser.contactUserList.find(contact => contact.id === chattingUserId)

        const res = await axios.get(messageApi.getMessageByChatBoxId(chatBoxId), headerToken.headerWithToken(myUser.id))
        dispatch(messageAction.dispatchFetchMessage(res.data))

        dispatch(chatBoxAction.dispatchChangeChatBoxId(chatBoxId, chattingUser))
        localStorage.setItem(`${myUser.id}`, chatBoxId)

        if (receivedMessage.chatBoxId === chatBoxId) {
            dispatch(realTimeAction.dispatchReceiveMessage({}))
        }
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
                chattingUsername = user.firstName + " " + user.lastName
            }
        })

        return chattingUsername
    }

    useEffect(async () => {
        if (chatBoxList.length === 0) {
            dispatch(messageAction.dispatchFetchMessage([]))

            dispatch(chatBoxAction.dispatchChangeChatBoxId("no-chat-box", "no-chatting-user"))
            localStorage.setItem(`${myUser.id}`, "no-chat-box")
        }
        else {
            const chattingUserId = getChattingUserId(chatBoxList[0].userIdList)
            const chattingUser = myUser.contactUserList.find(contact => contact.id === chattingUserId)

            const chatBoxId = chatBoxList[0].id

            const res = await axios.get(messageApi.getMessageByChatBoxId(chatBoxId), headerToken.headerWithToken(myUser.id))
            dispatch(messageAction.dispatchFetchMessage(res.data))

            dispatch(chatBoxAction.dispatchChangeChatBoxId(chatBoxId, chattingUser))
            localStorage.setItem(`${myUser.id}`, chatBoxId)
        }
    }, [])

    useEffect(() => {
        if (receivedMessage.chatBoxId === chatBoxId) {
            dispatch(realTimeAction.dispatchReceiveMessage({}))
        }
    }, [receivedMessage])

    const getSenderName = (senderName) => {
        const name = senderName.split(" ")
        return name[name.length - 1]
    }

    const lastMessageContent = (messageContent) => {
        if (messageContent.length > 30) {
            messageContent = messageContent.slice(0, 28) + "..."
        }
        return messageContent
    }

    const lastMessage = (item) => {
        if (item.id === receivedMessage.chatBoxId && item.id !== chatBoxId) {
            return (
                <div className="chatbox-item__new-message"> {`${receivedMessage.senderName}: ${receivedMessage.message}`} </div>
            )
        }
        else {
            if (item.lastMessage) {
                return (
                    <div className="chatbox-item__last-message">
                        {
                            item.lastMessage.senderId === myUser.id
                                ? lastMessageContent(`You: ${item.lastMessage.message}`)
                                : lastMessageContent(`${getSenderName(item.lastMessage.senderName)}: ${item.lastMessage.message}`)
                        }
                    </div>
                )
            }
            else {
                return (
                    <div className="chatbox-item__last-message">Say something</div>
                )
            }
        }
    }

    const showChatBoxList = () => {
        const result = chatBoxList.map((item, index) => {
            const chattingUserId = getChattingUserId(item.userIdList)
            const chattingUsername = getChattingUsername(chattingUserId)

            return (
                <div className={item.id === chatBoxId ? "chatbox-item-active" : "chatbox-item"} key={index} onClick={() => handleClick(item.id, chattingUserId)}>
                    <div className="chatbox-item__avatar">
                        {chattingUsername.slice(0, 1)}
                    </div>

                    <div className="chatbox-item__content">
                        <div className="chatbox-item__content-item">
                            <div className={item.id === receivedMessage.chatBoxId && item.id !== chatBoxId ? "chatbox-item__name-active" : "chatbox-item__name"}>
                                {chattingUsername}
                            </div>

                            {lastMessage(item)}
                        </div>

                        <span className={item.id === receivedMessage.chatBoxId && item.id !== chatBoxId ? "chatbox-item__unread-message-active" : "chatbox-item__unread-message"}></span>
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