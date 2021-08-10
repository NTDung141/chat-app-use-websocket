import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import MessageReducer from "./MessageReducer";
import ChatBoxReducer from "./ChatBoxReducer";
import RealTimeReducer from "./RealTimeReducer"

export default combineReducers({
    AuthReducer,
    MessageReducer,
    ChatBoxReducer,
    RealTimeReducer
})