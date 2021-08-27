import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../../redux/actions/AuthAction"
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

function LogoutPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const myUser = useSelector(state => state.AuthReducer.user)

    const logout = () => {
        dispatch(authActions.dispatchLogout())
        Cookies.remove(`${myUser.id}-TOKEN`)
        history.push("/")
    }

    return (
        <div>
            <button type="button" className="logout-btn" data-toggle="modal" data-target="#exampleModal">
                Log out
            </button>


            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                <i className="fas fa-exclamation-triangle mr-2"></i>
                                Warning
                            </h5>

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to log out?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={logout} data-dismiss="modal">Log out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogoutPage