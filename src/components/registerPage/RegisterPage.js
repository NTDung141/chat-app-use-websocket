import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import authApi from "../../enum/apis/auth/auth-api";
import "./RegisterPage.css"
import * as notify from "../notification/Notification"

function RegisterPage() {

    const [user, setUser] = useState({
        username: "",
        firstName: "",
        lastName: "",
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
        if (user.username !== "" && user.firstName !== "" && user.lastName !== "" && user.password !== "") {
            var registerRequest = {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,
                chatBoxIdList: [],
                contactUserIdList: []
            }

            try {
                const res = await axios.post(authApi.register, registerRequest)
                if (res.data) {
                    notify.successNotification("Register Success!")
                    history.push("/login")
                }
            }
            catch (e) {
                notify.errorNotification("Register failed!")
                console.log(e)
            }
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className="register-modal">
                <div className="register-modal__title">Register</div>

                <div className="mb-4">
                    <input className="form-control" name="username" value={user.username} onChange={handleInputChange} placeholder="User name" required />
                </div>

                <div className="mb-4">
                    <input className="form-control" name="firstName" value={user.firstName} onChange={handleInputChange} placeholder="First Name" required />
                </div>

                <div className="mb-4">
                    <input className="form-control" name="lastName" value={user.lastName} onChange={handleInputChange} placeholder="Last Name" required />
                </div>

                <div className="mb-4">
                    <input type="password" className="form-control" name="password" value={user.password} onChange={handleInputChange} placeholder="Password" required />
                </div>

                <button type="submit" className="register-modal__btn">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage