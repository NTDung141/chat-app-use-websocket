import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HeaderComponent.css"
import LogoutPage from "../logoutPage/LogoutPage";
import logo from "../../image/chat-logo.png"
import UserInfo from "../userInfo/UserInfo";
import SearchNewContact from "../searchNewContact/SearchNewContact";

const header = [
    {
        name: "Login",
        to: "/login"
    },
    {
        name: "Register",
        to: "/register"
    }
];

const ShowHeader = () => {
    var result = null
    result = header.map((item, index) => {
        return (
            <li className="nav-item" key={index}>
                <NavLink key={index} to={item.to} className="nav-link">
                    {item.name}
                </NavLink>
            </li>
        )
    })

    return result
}


function HeaderComponent() {
    const isLogged = useSelector(state => state.AuthReducer.isLogged)

    const firstname = useSelector(state => state.AuthReducer.user.firstName)
    const lastname = useSelector(state => state.AuthReducer.user.lastName)
    const myUsername = firstname + " " + lastname

    if (isLogged) {
        return (
            <nav className="navbar navbar-expand-lg navbar-light header">
                <div className="header__brand">
                    <div
                        className="header__logo"
                        style={{ backgroundImage: `url(${logo})` }}
                    ></div>

                    <form className="header__form">
                        <div className="header__icon">
                            <i className="far fa-search"></i>
                        </div>

                        <SearchNewContact />
                    </form>
                </div>

                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        {/* <div className="nav-item header__user">
                            <div className="header__user-avatar">{myUsername.slice(0, 1)}</div>
                            <div className="header__user-name">{myUsername}</div>
                        </div> */}

                        <UserInfo myUsername={myUsername} />

                        <div className="nav-item logout">
                            <LogoutPage />
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
    else {
        return (
            <nav className="navbar navbar-expand-lg navbar-light header">
                <div className="header__brand">
                    <div
                        className="header__logo"
                        style={{ backgroundImage: `url(${logo})` }}
                    ></div>
                </div>

                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <ShowHeader />
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default HeaderComponent;