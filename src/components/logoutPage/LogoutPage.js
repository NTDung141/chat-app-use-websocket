import { useDispatch } from "react-redux";
import * as authActions from "../../redux/actions/AuthAction"
import { useHistory } from "react-router-dom";

function LogoutPage() {
    const dispatch = useDispatch()
    const history = useHistory()

    const logout = () => {
        dispatch(authActions.dispatchLogout())
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
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Bạn có chắc chắn muốn đăng xuất
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                            <button type="button" className="btn btn-primary" onClick={logout} data-dismiss="modal">Đăng xuất</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogoutPage