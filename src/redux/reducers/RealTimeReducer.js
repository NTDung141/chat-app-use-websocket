import ACTIONS from "../actions";

const initialState = {
    receivedMessage: {}
}

const RealTimeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.RECEIVE_MESSAGE:
            return {
                receivedMessage: action.payload.receivedMessage
            }

        default:
            return state
    }
}

export default RealTimeReducer