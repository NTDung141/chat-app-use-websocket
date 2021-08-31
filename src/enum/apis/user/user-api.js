// const baseUrl = "https://server-chat-app-websocket.herokuapp.com"
const baseUrl = "http://localhost:8080"

const getUserById = (userId) => {
    return `${baseUrl}/user/${userId}`
}

export default {
    getAllUserList: `${baseUrl}/user/all-user`,
    getUserById
}