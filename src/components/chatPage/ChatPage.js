import ChatMessage from "../chatMessage/ChatMessage"
import "./ChatPage.css"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import SockJS from 'sockjs-client'
import * as Stomp from 'stompjs'
import axios from "axios";
import * as messageActions from "../../redux/actions/MessageAction"

function ChatPage() {
    const [message, setMessage] = useState({
        senderId: "",
        senderName: "",
        message: ""
    })

    var stompClient = null

    const myUser = useSelector(state => state.AuthReducer.user)
    const messageList = useSelector(state => state.MessageReducer)
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setMessage({
            senderId: myUser.id,
            senderName: myUser.refName,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(messageActions.dispatchSendMessage(message))
        sendMessage()
        setMessage({
            senderId: "",
            senderName: "",
            message: ""
        })
    }

    const connect = () => {
        const socket = new SockJS("/socket-server")
        stompClient = Stomp.over(socket)
        stompClient.connect({}, () => {
            console.log("Kêt nối thành công")
            stompClient.subscribe("/topic/public", recieveMessage)
        })
    }

    useEffect(() => {
        connect()
    }, [])

    const sendMessage = async () => {
        const res = await axios.post("/message/create-message", {
            senderId: message.senderId,
            senderName: message.senderName,
            message: message.message
        })
    }

    const recieveMessage = (res) => {
        const resBody = JSON.parse(res.body)
        if (resBody.senderId !== myUser.id) {
            const newMessage = {
                senderId: resBody.senderId,
                senderName: resBody.senderName,
                message: resBody.message
            }
            dispatch(messageActions.dispatchSendMessage(newMessage))
        }
    }

    return (
        <div className="chat-page">
            <ChatMessage
                messageList={messageList}
                myUser={myUser} />

            <form className="chat-form" onSubmit={handleSubmit}>
                <input className="chat-form-input" name="message" value={message.message} onChange={handleInputChange} />
                <button type="submit" className="btn btn-primary">Gửi</button>
            </form>
        </div>

    )
}

export default ChatPage