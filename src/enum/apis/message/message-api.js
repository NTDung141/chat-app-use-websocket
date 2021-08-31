const baseUrl = "https://server-chat-app-websocket.herokuapp.com"
// const baseUrl = "http://localhost:8080"

const getMessageByChatBoxId = (chatBoxId) => {
    return `${baseUrl}/message/${chatBoxId}`
}

export default {
    createMessage: `${baseUrl}/message/create-message`,
    getMessageByChatBoxId
}