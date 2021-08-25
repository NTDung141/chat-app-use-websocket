import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authApi from "../../enum/apis/auth/auth-api";
import * as authActions from "../../redux/actions/AuthAction"
import * as chatBoxListActions from "../../redux/actions/ChatBoxListAction"
import { useHistory } from "react-router-dom";
import "./LoginPage.css"

function LoginPage() {

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const dispatch = useDispatch()
    const history = useHistory()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        var loginRequest = {
            username: user.username,
            password: user.password
        }

        try {
            const res = await axios.post(authApi.login, loginRequest)
            const user = res.data.user
            dispatch(authActions.dispatchLogin(user))
            dispatch(chatBoxListActions.dispatchFetchChatBox(user.chatBoxList))
            history.push("/chat")
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="login-modal">
                <div className="login-modal__title">Log In</div>

                <div className="mb-4">
                    <input className="form-control" name="username" value={user.username} onChange={handleInputChange} placeholder="Username" />
                </div>
                <div className="mb-4">
                    <input type="password" className="form-control" name="password" value={user.password} onChange={handleInputChange} placeholder="Password" />
                </div>
                <button type="submit" className="login-modal__btn">Login</button>
            </form>
        </div>
    )
}

export default LoginPage;