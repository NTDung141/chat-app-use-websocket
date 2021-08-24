import "./ChatMessage.css"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as authActions from "../../redux/actions/AuthAction"
import * as messageAction from "../../redux/actions/MessageAction"
import * as chatBoxAction from "../../redux/actions/ChatBoxAction"

function ChatMessage() {

    const myUser = useSelector(state => state.AuthReducer.user)
    const messageList = useSelector(state => state.MessageReducer)
    const chatBox = useSelector(state => state.ChatBoxReducer)

    const lastMessageElement = useRef(null)

    const dispatch = useDispatch()

    useEffect(() => {
        showMessageList()
    }, [messageList])

    useEffect(() => {
        if (lastMessageElement) {
            lastMessageElement.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
            })
        }
    }, [])

    const showMessageList = () => {
        const messageListLength = messageList.length

        const result = messageList.map((item, index, array) => {
            if (item.senderId === myUser.id) {
                return (
                    <div className="my-message" key={index}>
                        <div className="my-message-content"> {item.message} </div>
                    </div>
                )
            }
            else {
                var avatarName = item.senderName
                if (avatarName) {
                    avatarName = avatarName.slice(0, 1)
                }

                if ((index < messageListLength - 1) && (array[index + 1].senderId === item.senderId)) {
                    return (
                        <div className="friend-message" key={index}>
                            <div className="friend-message-avatar-empty"></div>
                            <div className="friend-message-content"> {item.message} </div>
                        </div>
                    )
                }

                return (
                    <div className="friend-message" key={index}>
                        <div className="friend-message-avatar"> {avatarName} </div>
                        <div className="friend-message-content"> {item.message} </div>
                    </div>
                )
            }
        })

        return result
    }

    const welcomeNewContact = () => {
        return (
            <div className="welcome-new-contact">
                <div className="welcome__title mt-4">
                    Click button to start chatting with
                </div>

                <div className="welcome__title mb-3">
                    {`${chatBox.chattingUser.firstName + " " + chatBox.chattingUser.lastName}`}
                </div>

                <div className="welcome__chat-active">
                    <button className="btn btn-primary" onClick={createNewChatRoom}>Start</button>
                </div>
            </div>
        )
    }

    const createNewChatRoom = async () => {
        const newChatBox = {
            userIdList: [myUser.id, chatBox.chattingUser.id]
        }

        const res = await axios.post("/chatbox/create-chat-box", newChatBox)
        if (res) {
            let chatBoxList = myUser.chatBoxList
            chatBoxList.push(res.data)

            let contactUserList = myUser.contactUserList
            contactUserList.push(chatBox.chattingUser)

            dispatch(authActions.dispatchAddNewChatBoxAndContact(chatBoxList, contactUserList))

            dispatch(messageAction.dispatchFetchMessage([]))

            dispatch(chatBoxAction.dispatchChangeChatBoxId(res.data.id, chatBox.chattingUser))
            localStorage.setItem(`${myUser.id}`, res.data.id)
        }
    }

    const saySomething = () => {
        return (
            <div className="welcome-new-contact">
                <div className="welcome__title mt-4">
                    {`Say something to ${chatBox.chattingUser.firstName + " " + chatBox.chattingUser.lastName}`}
                </div>
            </div>
        )
    }

    const welcomeNewUser = () => {
        return (
            <div className="welcome-new-contact">
                <div className="welcome__title mt-4">
                    Welcome to Chat App
                </div>
            </div>
        )
    }

    return (
        <div className="chat-message" ref={lastMessageElement}>
            {chatBox.chatBoxId === "new-chat-box" && welcomeNewContact()}

            {(messageList.length === 0 && chatBox.chatBoxId !== "no-chat-box" && chatBox.chatBoxId !== "new-chat-box") && saySomething()}

            {(chatBox.chatBoxId === "no-chat-box") && welcomeNewUser()}

            {showMessageList()}
        </div>
    )
}

export default ChatMessage