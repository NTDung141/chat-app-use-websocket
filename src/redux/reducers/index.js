import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import MessageReducer from "./MessageReducer";
import ChatBoxReducer from "./ChatBoxReducer";

export default combineReducers({
    AuthReducer,
    MessageReducer,
    ChatBoxReducer
})