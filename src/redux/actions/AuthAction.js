import ACTIONS from "./index";
import axios from "axios";

export const dispatchLogin = (username) => {
    return {
        type: ACTIONS.LOGIN,
        payload: {
            username: username
        }
    }
}

export const dispatchLogout = () => {
    return {
        type: ACTIONS.LOGOUT
    }
}