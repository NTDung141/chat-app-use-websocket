import "./ChatList.css"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import * as messageAction from "../../redux/actions/MessageAction"
import * as chatBoxAction from "../../redux/actions/ChatBoxAction"
import * as realTimeAction from "../../redux/actions/RealTimeAction"
import { useEffect, useState } from "react"

function ChatList() {
    const myUser = useSelector(state => state.AuthReducer.user)
    const [chatBoxList, setChatBoxList] = useState(myUser.chatBoxList)
    const contactUserList = myUser.contactUserList
    const receivedMessage = useSelector(state => state.RealTimeReducer.receivedMessage)
    const chatBoxId = useSelector(state => state.ChatBoxReducer.chatBoxId)

    const dispatch = useDispatch()

    const handleClick = async (chatBoxId, chattingUserId) => {
        const chattingUser = myUser.contactUserList.find(contact => contact.id === chattingUserId)

        const res = await axios.get(`/message/${chatBoxId}`)
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

            const res = await axios.get(`/message/${chatBoxId}`)
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

    const lastMessage = (itemId) => {
        if (itemId === receivedMessage.chatBoxId && itemId !== chatBoxId) {
            return (
                <div className="chatbox-item__new-message"> {`${receivedMessage.senderName}: ${receivedMessage.message}`} </div>
            )
        }
        else {
            return (
                <div className="chatbox-item__last-message"> Last message</div>
            )
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

                            {lastMessage(item.id)}
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