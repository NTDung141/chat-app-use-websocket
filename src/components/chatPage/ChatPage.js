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
        username: "",
        content: ""
    })

    var stompClient = null

    const myUsername = useSelector(state => state.AuthReducer.username)
    const messageList = useSelector(state => state.MessageReducer)
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setMessage({
            username: myUsername,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(messageActions.dispatchSendMessage(message))
        sendMessage()
        setMessage({
            username: "",
            content: ""
        })
    }

    useEffect(() => {
        console.log(messageList)
    }, [messageList])


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
            message: message.content,
            sender: message.username
        })
    }

    const recieveMessage = (res) => {
        const resBody = JSON.parse(res.body)
        const newMessage = {
            username: resBody.sender,
            content: resBody.message
        }
        dispatch(messageActions.dispatchSendMessage(newMessage))
    }

    return (
        <div className="chat-page">
            <ChatMessage messageList={messageList} />

            <form className="chat-form" onSubmit={handleSubmit}>
                <input className="chat-form-input" name="content" value={message.content} onChange={handleInputChange} />
                <button type="submit" className="btn btn-primary">Gửi</button>
            </form>
        </div>

    )
}

export default ChatPage