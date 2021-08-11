import "./ChatMessage.css"
import { useEffect, useState } from "react"
import { useRef } from "react";

function ChatMessage(props) {
    const messageList = props.messageList;
    const myUser = props.myUser;

    const lastMessageElement = useRef(null)

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

    return (
        <div className="chat-message" ref={lastMessageElement}>
            {showMessageList()}
        </div>
    )
}

export default ChatMessage