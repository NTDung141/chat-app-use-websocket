import ChatPage from "../components/chatPage/ChatPage"
import ChatList from "../components/chatList/ChatList";

function AppView() {
    return (
        <div>
            <div className="row">
                <div className="col col-md-3">
                    <ChatList />
                </div>
                <div className="col col-md-9">
                    <ChatPage />
                </div>
            </div>
        </div>
    )
}

export default AppView;