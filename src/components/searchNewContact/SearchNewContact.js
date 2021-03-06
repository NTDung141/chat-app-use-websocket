import "./SearchNewContact.css"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as chatBoxAction from "../../redux/actions/ChatBoxAction"
import * as messageAction from "../../redux/actions/MessageAction"
import axios from "axios"
import userApi from "../../enum/apis/user/user-api"
import messageApi from "../../enum/apis/message/message-api"
import headerToken from "../../enum/headerWithToken/header-token"

function SearchNewContact() {

    const myUser = useSelector(state => state.AuthReducer.user)

    const [allUserList, setAllUserList] = useState([])
    const [searchList, setSearchList] = useState(allUserList)
    const [searchValue, setSearchValue] = useState("")

    const dispatch = useDispatch()

    useEffect(async () => {
        const res = await axios.get(userApi.getAllUserList, null, headerToken.headerWithToken(myUser.id))

        if (res) {
            const userList = res.data.filter(contact => contact.id !== myUser.id)
            setAllUserList(userList)
            setSearchList(userList)
        }
    }, [])

    const removeSearchValue = () => {
        setSearchValue("")
        setSearchList(allUserList)
    }

    const handleInputChange = (event) => {
        const { value } = event.target
        setSearchValue(value)

        const searchResult = allUserList.filter(contact => {
            const contactName = contact.firstName + " " + contact.lastName
            let index = contactName.toLowerCase().indexOf(value.toLowerCase())
            if (index > -1) {
                return contact
            }
        })

        if (value !== "") {
            setSearchList(searchResult)
        }
        else {
            setSearchList(allUserList)
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

        if (chatBox) {
            const chattingUser = myUser.contactUserList.find(contact => contact.id === contactId)

            dispatch(chatBoxAction.dispatchChangeChatBoxId(chatBox.id, chattingUser))
            localStorage.setItem(`${myUser.id}`, chatBox.id)

            const res = await axios.get(messageApi.getMessageByChatBoxId(chatBox.id), null, headerToken.headerWithToken(myUser.id))

            dispatch(messageAction.dispatchFetchMessage(res.data))

            removeSearchValue()
        }
        else {
            const chattingUser = allUserList.find(contact => contact.id === contactId)

            dispatch(chatBoxAction.dispatchChangeChatBoxId("new-chat-box", chattingUser))
            localStorage.setItem(`${myUser.id}`, "new-chat-box")

            dispatch(messageAction.dispatchFetchMessage([]))

            removeSearchValue()
        }

    }

    const showSearchList = () => {
        const result = searchList.map(contact => {
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
        <div className="search-new-contact">
            <div className="header__search" data-toggle="modal" data-target="#searchNewContactModel">Search new contact</div>

            <div className="modal fade" id="searchNewContactModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Search new contact</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={removeSearchValue}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="search-new-contact__search">
                                <input className="header__search" placeholder="Search new contact" name="searchValue" value={searchValue} onChange={handleInputChange} />
                            </div>

                            <div className="search-new-contact__search-list">
                                {showSearchList()}
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

export default SearchNewContact