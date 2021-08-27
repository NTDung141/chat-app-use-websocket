import "../chatListControl/ChatListControl.css"
import "./SearchContact.css"
import "../searchNewContact/SearchNewContact.css"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as chatBoxAction from "../../redux/actions/ChatBoxAction"
import * as messageAction from "../../redux/actions/MessageAction"
import axios from "axios"
import messageApi from "../../enum/apis/message/message-api"
import headerToken from "../../enum/headerWithToken/header-token"

function SearchContact() {
    const myUser = useSelector(state => state.AuthReducer.user)
    const initialContactList = myUser.contactUserList

    const [contactList, setContactList] = useState(initialContactList)
    const [searchValue, setSearchValue] = useState("")

    const dispatch = useDispatch()

    const removeSearchValue = () => {
        setSearchValue("")
        setContactList(initialContactList)
    }

    const handleInputChange = (event) => {
        const { value } = event.target
        setSearchValue(value)

        const searchResult = initialContactList.filter(contact => {
            const contactName = contact.firstName + " " + contact.lastName
            let index = contactName.toLowerCase().indexOf(value.toLowerCase())
            if (index > -1) {
                return contact
            }
        })

        if (value !== "") {
            setContactList(searchResult)
        }
        else {
            setContactList(initialContactList)
        }
    }

    const getChatBoxId = (contactId) => {
        const result = myUser.chatBoxList.filter(chatBox => {
            const foundId = chatBox.userIdList.find(id => id === contactId)

            if (foundId) {
                return chatBox
            }
        })

        return result[0]
    }

    const moveToChatBox = async (contactId) => {
        const chatBox = getChatBoxId(contactId)
        const chattingUser = myUser.contactUserList.find(contact => contact.id === contactId)

        dispatch(chatBoxAction.dispatchChangeChatBoxId(chatBox.id, chattingUser))
        localStorage.setItem(`${myUser.id}`, chatBox.id)

        const res = await axios.get(messageApi.getMessageByChatBoxId(chatBox.id), headerToken.headerWithToken(myUser.id))

        dispatch(messageAction.dispatchFetchMessage(res.data))

        removeSearchValue()
    }

    const showContactList = () => {
        const contactListToShow = contactList.filter(contact => contact.id !== myUser.id)

        const result = contactListToShow.map(contact => {
            const contactName = contact.firstName + " " + contact.lastName
            return (
                <div className="contact-item" onClick={() => moveToChatBox(contact.id)} data-dismiss="modal">
                    <div className="contact-item__avatar">{contactName.slice(0, 1)}</div>
                    <div className="contact-item__name">{contactName}</div>
                </div>
            )
        })

        return result
    }

    return (
        <div style={{ width: "100%" }}>
            <div className="chat-list-control__search" data-toggle="modal" data-target="#searchModal">Search on your chat</div>

            <div className="modal fade" id="searchModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Search on your chat</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={removeSearchValue}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <input className="chat-list-control__search mb-3" name="searchValue" value={searchValue} placeholder="Search on your chat" onChange={handleInputChange} />

                            <div className="search-new-contact__search-list">
                                {showContactList()}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={removeSearchValue}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchContact