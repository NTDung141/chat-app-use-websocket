import Cookies from "js-cookie"

const headerWithToken = (myUserId) => {
    const token = Cookies.get(`${myUserId}-TOKEN`)

    if (token && myUserId) {
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }
    else {
        return null
    }
}

export default {
    headerWithToken
}