import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

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

    const myUsername = useSelector(state => state.AuthReducer.username)

    if (isLogged) {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand">Chat App</a>

                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">

                    </div>

                    <ul className="navbar-nav justify-content-end">
                        <li className="nav-item">
                            Chào {myUsername}
                        </li>
                        <li className="nav-item">
                            <NavLink to="/logout" className="nav-link">
                                Log out
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
    else {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand">Chat App</a>

                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">

                    </div>

                    <ul className="navbar-nav justify-content-end">
                        <ShowHeader />
                    </ul>
                </div>
            </nav>
        )
    }
}

export default HeaderComponent;