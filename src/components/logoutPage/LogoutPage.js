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
            <h3>Bạn chắc chắn muốn đăng xuất</h3>
            <button className="btn btn-primary mr-2" onClick={logout} >Đồng ý</button>
            <button className="btn btn-danger">Hủy</button>
        </div>
    )
}

export default LogoutPage