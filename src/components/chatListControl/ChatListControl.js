import "./ChatListControl.css"

function ChatListControl() {
    return (
        <div className="chat-list-control">
            <div className="chat-list-control__header">
                <h3> Chat </h3>
            </div>

            <form className="chat-list-control__form">
                <input className="chat-list-control__search" placeholder="Tìm kiếm trên Messenger" />
            </form>
        </div>
    )
}

export default ChatListControl