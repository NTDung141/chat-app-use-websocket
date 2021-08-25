import ACTIONS from "./index";

export const dispatchLogin = (user) => {
    return {
        type: ACTIONS.LOGIN,
        payload: {
            user: user
        }
    }
}

export const dispatchLogout = () => {
    return {
        type: ACTIONS.LOGOUT
    }
}

export const dispatchAddNewContact = (newContactList) => {
    return {
        type: ACTIONS.ADD_CONTACT,
        payload: {
            newContactList
        }
    }
}