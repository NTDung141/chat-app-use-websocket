import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HeaderComponent.css"

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

    const myUsername = useSelector(state => state.AuthReducer.user.refName)

    if (isLogged) {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand">Chat App</a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <div className="nav-item header__user">
                            <div className="header__user-avatar">{myUsername.slice(0, 1)}</div>
                            <div className="header__user-name">{myUsername}</div>
                        </div>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/logout" className="nav-link">
                                    Log out
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
    else {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand">Chat App</a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

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