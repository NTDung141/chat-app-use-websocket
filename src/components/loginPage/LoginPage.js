import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authApi from "../../enum/apis/auth/auth-api";
import * as authActions from "../../redux/actions/AuthAction"
import { useHistory } from "react-router-dom";

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
            history.push("/chat")
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ width: 500, margin: "auto", paddingTop: 50 }}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input className="form-control" name="username" value={user.username} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={user.password} onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default LoginPage;