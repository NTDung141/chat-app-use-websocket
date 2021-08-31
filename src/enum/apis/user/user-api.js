const baseUrl = "https://server-chat-app-websocket.herokuapp.com"

const getUserById = (userId) => {
    return `${baseUrl}user/${userId}`
}

export default {
    getAllUserList: `${baseUrl}user/all-user`,
    getUserById
}