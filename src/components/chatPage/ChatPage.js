import ChatMessage from "../chatMessage/ChatMessage"
import "./ChatPage.css"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import SockJS from 'sockjs-client'
import * as Stomp from 'stompjs'
import axios from "axios";
import * as messageActions from "../../redux/actions/MessageAction"
import messageApi from "../../enum/apis/message/message-api";
import * as realTimeActions from "../../redux/actions/RealTimeAction"
import * as chatBoxListActions from "../../redux/actions/ChatBoxListAction"
import * as authActions from "../../redux/actions/AuthAction"
import userApi from "../../enum/apis/user/user-api";
import headerToken from "../../enum/headerWithToken/header-token";

function ChatPage() {

    let stompClient = null

    const myUser = useSelector(state => state.AuthReducer.user)
    const messageList = useSelector(state => state.MessageReducer)
    const chatBox = useSelector(state => state.ChatBoxReducer)
    const chatBoxList = useSelector(state => state.ChatBoxListReducer)
    const baseUrl = "https://server-chat-app-websocket.herokuapp.com"
    // const baseUrl = "http://localhost:8080"

    const [message, setMessage] = useState({
        senderId: "",
        senderName: "",
        message: "",
    })

    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        const { value } = e.target
        setMessage({
            senderId: myUser.id,
            senderName: myUser.firstName + " " + myUser.lastName,
            message: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (message.message !== "") {
            const now = new Date()
            const sendTimeUnix = Math.floor(now / 1000)

            const newMessage = {
                senderId: message.senderId,
                senderName: message.senderName,
                message: message.message,
                chatBoxId: chatBox.chatBoxId,
                receiverId: chatBox.chattingUser.id,
                sendTimeUnix: sendTimeUnix
            }

            dispatch(messageActions.dispatchSendMessage(newMessage))

            dispatch(chatBoxListActions.dispatchAddNewMessageToChatBox(newMessage))

            sendMessage(newMessage)
            setMessage({
                senderId: "",
                senderName: "",
                message: "",
            })
        }
    }

    const connect = () => {
        const socket = new SockJS(baseUrl + "/socket-server")
        stompClient = Stomp.over(socket)
        stompClient.connect({}, () => {
            console.log("Kêt nối thành công")
            stompClient.subscribe(`/topic/message/${myUser.id}`, recieveMessage)
        })
    }

    useEffect(() => {
        connect()
    }, [])

    const sendMessage = async (newMessage) => {
        const res = await axios.post(messageApi.createMessage, newMessage, headerToken.headerWithToken(myUser.id))
    }

    const recieveMessage = async (res) => {
        const resBody = JSON.parse(res.body)
        const chatBoxId = localStorage.getItem(`${myUser.id}`)
        if (resBody.chatBoxId === chatBoxId) {
            dispatch(messageActions.dispatchSendMessage(resBody))
        }
        else {
            let isExistedChatBox = false

            chatBoxList.forEach(item => {
                if (item.id === resBody.chatBoxId) {
                    isExistedChatBox = true
                }
            })

            if (isExistedChatBox) {
                dispatch(realTimeActions.dispatchReceiveMessage(resBody))

                dispatch(chatBoxListActions.dispatchAddNewMessageToChatBox(resBody))
            }
            else {
                const res = await axios.get(userApi.getUserById(myUser.id), null, headerToken.headerWithToken(myUser.id))

                if (res) {
                    const user = res.data
                    dispatch(authActions.dispatchLogin(user))
                    dispatch(chatBoxListActions.dispatchFetchChatBox(user.chatBoxList))
                }
            }
        }
    }

    const getChattingUsername = (userId) => {
        var chattingUsername = ""

        if (chatBox.chatBoxId !== "new-chat-box") {
            myUser.contactUserList.forEach(user => {
                if (user.id === userId) {
                    chattingUsername = user.firstName + " " + user.lastName
                }
            })
        }
        else {
            chattingUsername = chatBox.chattingUser.firstName + " " + chatBox.chattingUser.lastName
        }

        return chattingUsername
    }

    const chattingUsername = getChattingUsername(chatBox.chattingUser.id)

    return (
        <div className="chat-page">
            <div className="chat-page__user-info">
                {chatBox.chatBoxId !== "no-chat-box" &&
                    <div className="chat-page__user-info-avatar">{chattingUsername.slice(0, 1)}</div>
                }

                <div className="chat-page__user-info-name">{chattingUsername}</div>

            </div>

            <ChatMessage
                messageList={messageList}
                myUser={myUser}
                chatBox={chatBox}
            />

            <form className="chat-form" onSubmit={handleSubmit}>
                <input
                    className="chat-form-input"
                    value={message.message}
                    onChange={handleInputChange}
                    placeholder="Aa"
                    disabled={chatBox.chatBoxId === "new-chat-box"}
                />
                {/* <button type="submit" className="btn btn-primary">Gửi</button> */}
            </form>

        </div>
    )
}

export default ChatPage