import ChatMessage from "../chatMessage/ChatMessage"
import "./ChatPage.css"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import SockJS from 'sockjs-client'
import * as Stomp from 'stompjs'
import axios from "axios";

function ChatPage() {
    const [message, setMessage] = useState({
        username: "",
        content: ""
    })

    const [stompClientState, setStompClientState] = useState({})

    var stompClient = null

    const [messageList, setMessageList] = useState([])

    const myUsername = useSelector(state => state.AuthReducer.username)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setMessage({
            username: myUsername,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessageList([...messageList, message])
        send()
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
            stompClient.subscribe("/topic/public", (res) => {
                const newMessage = JSON.parse(res.body)
                setMessageList([...messageList, {
                    username: newMessage.sender,
                    content: newMessage.message
                }])
            })
            setStompClientState(stompClient)
        })
    }

    useEffect(() => {
        connect()
    }, [])

    const send = async () => {
        const res = await axios.post("/message/create-message", {
            message: message.content,
            sender: message.username
        })
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