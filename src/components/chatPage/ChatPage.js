import ChatMessage from "../chatMessage/ChatMessage"
import "./ChatPage.css"
import { useEffect, useState } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import SockJS from 'sockjs-client'
import * as Stomp from 'stompjs'
import axios from "axios";
import * as messageActions from "../../redux/actions/MessageAction"
import messageApi from "../../enum/apis/message/message-api";

function ChatPage() {

    var stompClient = null

    const myUser = useSelector(state => state.AuthReducer.user)
    const messageList = useSelector(state => state.MessageReducer)
    const chatBoxId = useSelector(state => state.ChatBoxReducer.chatBoxId)
    const chattingUserId = useSelector(state => state.ChatBoxReducer.chattingUserId)

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
            senderName: myUser.refName,
            message: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newMessage = {
            senderId: message.senderId,
            senderName: message.senderName,
            message: message.message,
            chatBoxId: chatBoxId,
            receiverId: chattingUserId
        }
        dispatch(messageActions.dispatchSendMessage(newMessage))
        sendMessage()
        setMessage({
            senderId: "",
            senderName: "",
            message: "",
        })
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
        console.log(chatBoxId)
    }, [])

    const sendMessage = async () => {
        const newMessage = {
            senderId: message.senderId,
            senderName: message.senderName,
            message: message.message,
            chatBoxId: chatBoxId,
            receiverId: chattingUserId
        }
        const res = await axios.post(messageApi.createMessage, newMessage)
    }

    const recieveMessage = (res) => {
        const resBody = JSON.parse(res.body)
        if (resBody.chatBoxId === chatBoxId) {
            dispatch(messageActions.dispatchSendMessage(resBody))
        }
    }

    return (
        <div className="chat-page">
            <ChatMessage
                messageList={messageList}
                myUser={myUser} />

            <div className="chat-page__user-info">
                <div className="chat-page__user-info-avatar">N</div>
                <div className="chat-page__user-info-name">Nguyen Thanh Dung</div>
            </div>

            <form className="chat-form" onSubmit={handleSubmit}>
                <input className="chat-form-input" value={message.message} onChange={handleInputChange} />
                <button type="submit" className="btn btn-primary">Gửi</button>
            </form>
        </div>
    )
}

export default ChatPage