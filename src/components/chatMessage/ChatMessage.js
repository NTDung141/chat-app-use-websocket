import "./ChatMessage.css"
import { useEffect, useState } from "react"

function ChatMessage(props) {
    const messageList = props.messageList;

    const showMessageList = () => {
        const result = messageList.map((item, index) => {
            return (
                <li key={index}>{item.username} : {item.content}</li>
            )
        })

        return result
    }

    useEffect(() => {
        showMessageList()
    }, [messageList])

    return (
        <div className="chat-message">
            <ul>
                {showMessageList()}
            </ul>
        </div>
    )
}

export default ChatMessage