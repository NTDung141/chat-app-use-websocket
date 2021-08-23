import "./ChatListControl.css"
import SearchContact from "../searchContact/SearchContact"

function ChatListControl() {
    return (
        <div className="chat-list-control">
            <div className="chat-list-control__header">
                <h3> Chat </h3>
                <i class="fas fa-plus"></i>
            </div>

            <form className="chat-list-control__form">
                <div className="chat-list-control__search-icon">
                    <i className="far fa-search"></i>
                </div>

                <SearchContact />
            </form>
        </div>
    )
}

export default ChatListControl