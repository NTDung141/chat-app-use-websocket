import "./SearchNewContact.css"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as chatBoxAction from "../../redux/actions/ChatBoxAction"
import * as messageAction from "../../redux/actions/MessageAction"
import axios from "axios"

function SearchNewContact() {

    const myUser = useSelector(state => state.AuthReducer.user)
    const contactList = myUser.contactUserList

    const [allUserList, setAllUserList] = useState([])
    const [searchList, setSearchList] = useState(allUserList)
    const [searchValue, setSearchValue] = useState("")

    const dispatch = useDispatch()

    useEffect(async () => {
        const res = await axios.get("/user/all-user")

        if (res) {
            setAllUserList(res.data)
            setSearchList(res.data)
        }
    }, [])

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

        dispatch(chatBoxAction.dispatchChangeChatBoxId(chatBox.id, contactId))
        localStorage.setItem(`${myUser.id}`, chatBox.id)

        const res = await axios.get(`/message/${chatBox.id}`)

        dispatch(messageAction.dispatchFetchMessage(res.data))
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

            <div class="modal fade" id="searchNewContactModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Search new contact</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="search-new-contact__search">
                                <input className="header__search" placeholder="Search new contact" name="searchValue" value={searchValue} onChange={handleInputChange} />
                            </div>

                            {showSearchList()}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchNewContact