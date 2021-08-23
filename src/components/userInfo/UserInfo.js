import { useState } from "react"
import { useSelector } from "react-redux"
import "./UserInfo.css"

function UserInfo(props) {

    const { myUsername } = props
    const myUser = useSelector(state => state.AuthReducer.user)
    const [myUserState, setMyUserState] = useState(myUser)
    const [isEdit, setIsEdit] = useState(false)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setMyUserState({
            ...myUserState,
            [name]: value
        })
    }

    const handleSubmit = () => {

    }

    const onEdit = (isEdit) => {
        setIsEdit(isEdit)
    }

    return (
        <div>
            <div className="nav-item header__user" data-toggle="modal" data-target="#exampleModalCenter">
                <div className="header__user-avatar">{myUsername.slice(0, 1)}</div>
                <div className="header__user-name">{myUsername}</div>
            </div>

            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Your account</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => onEdit(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="user-info">
                                <div className="mb-4">
                                    <div className="user-info__label">User name</div>

                                    <input className="form-control" value={myUserState.username} name="username" onChange={handleInputChange} disabled={!isEdit} />
                                </div>

                                <div className="mb-4">
                                    <div className="user-info__label">First name</div>

                                    <input className="form-control" value={myUserState.firstName} name="firstName" onChange={handleInputChange} disabled={!isEdit} />
                                </div>

                                <div className="mb-4">
                                    <div className="user-info__label">Last name</div>

                                    <input className="form-control" value={myUserState.lastName} name="lastName" onChange={handleInputChange} disabled={!isEdit} />
                                </div>
                            </div>
                        </div>

                        {isEdit ?
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => onEdit(false)}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                            </div> :
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => onEdit(true)}>Edit</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo