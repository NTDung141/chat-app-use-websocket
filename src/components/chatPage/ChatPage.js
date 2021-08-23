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

function ChatPage() {

    let stompClient = null

    const myUser = useSelector(state => state.AuthReducer.user)
    const messageList = useSelector(state => state.MessageReducer)
    const chatBox = useSelector(state => state.ChatBoxReducer)

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
            const newMessage = {
                senderId: message.senderId,
                senderName: message.senderName,
                message: message.message,
                chatBoxId: chatBox.chatBoxId,
                receiverId: chatBox.chattingUserId
            }
            dispatch(messageActions.dispatchSendMessage(newMessage))
            sendMessage()
            setMessage({
                senderId: "",
                senderName: "",
                message: "",
            })
        }
    }

    const connect = () => {
        const socket = new SockJS("/socket-server")
        stompClient = Stomp.over(socket)
        stompClient.connect({}, () => {
            console.log("Kêt nối thành công")
            stompClient.subscribe(`/topic/message/${myUser.id}`, recieveMessage)
        })
    }

    useEffect(() => {
        connect()
    }, [])

    const sendMessage = async () => {
        const newMessage = {
            senderId: message.senderId,
            senderName: message.senderName,
            message: message.message,
            chatBoxId: chatBox.chatBoxId,
            receiverId: chatBox.chattingUserId
        }
        const res = await axios.post(messageApi.createMessage, newMessage)
    }

    const recieveMessage = (res) => {
        const resBody = JSON.parse(res.body)
        const chatBoxId = localStorage.getItem(`${myUser.id}`)
        if (resBody.chatBoxId === chatBoxId) {
            dispatch(messageActions.dispatchSendMessage(resBody))
        }
        else {
            dispatch(realTimeActions.dispatchReceiveMessage(resBody))
        }
    }

    const getChattingUsername = (userId) => {
        var chattingUsername = ""
        myUser.contactUserList.forEach(user => {
            if (user.id === userId) {
                chattingUsername = user.firstName + " " + user.lastName
            }
        })

        return chattingUsername
    }

    const chattingUsername = getChattingUsername(chatBox.chattingUserId)

    return (
        <div className="chat-page">
            <div className="chat-page__user-info">
                <div className="chat-page__user-info-avatar">{chattingUsername.slice(0, 1)}</div>
                <div className="chat-page__user-info-name">{chattingUsername}</div>
            </div>

            <ChatMessage
                messageList={messageList}
                myUser={myUser}
            />

            <form className="chat-form" onSubmit={handleSubmit}>
                <input className="chat-form-input" value={message.message} onChange={handleInputChange} placeholder="Aa" />
                <button type="submit" className="btn btn-primary">Gửi</button>
            </form>

        </div>
    )
}

export default ChatPage