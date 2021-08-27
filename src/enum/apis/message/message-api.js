const getMessageByChatBoxId = (chatBoxId) => {
    return `/message/${chatBoxId}`
}

export default {
    createMessage: "/message/create-message",
    getMessageByChatBoxId
}