import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import MessageReducer from "./MessageReducer";
import ChatBoxReducer from "./ChatBoxReducer";
import RealTimeReducer from "./RealTimeReducer"
import ChatBoxListReducer from "./ChatBoxListReducer";

export default combineReducers({
    AuthReducer,
    MessageReducer,
    ChatBoxReducer,
    RealTimeReducer,
    ChatBoxListReducer
})