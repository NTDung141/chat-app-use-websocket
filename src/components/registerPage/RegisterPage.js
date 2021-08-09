import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import authApi from "../../enum/apis/auth/auth-api";

function RegisterPage() {

    const [user, setUser] = useState({
        username: "",
        refname: "",
        password: ""
    })

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
        var registerRequest = {
            username: user.username,
            refName: user.refName,
            password: user.password,
            chatBoxIdList: []
        }

        try {
            const res = await axios.post(authApi.register, registerRequest)
            if (res.data) {
                history.push("/login")
            }
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
                    <label className="form-label">Refer Name</label>
                    <input className="form-control" name="refName" value={user.refName} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={user.password} onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage