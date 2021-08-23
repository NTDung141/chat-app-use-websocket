import ChatPage from "../components/chatPage/ChatPage"
import ChatList from "../components/chatList/ChatList";
import ChatListControl from "../components/chatListControl/ChatListControl";

function AppView() {
    return (
        <div className="App__App-view">
            <div className="App__chat-list">
                <ChatListControl />

                <hr />

                <ChatList />
            </div>

            <div className="App__message">
                <ChatPage />
            </div>
        </div>
    )
}

export default AppView;