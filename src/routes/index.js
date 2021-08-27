import { Route, Switch } from 'react-router-dom'
import HomePage from "../components/homePage/HomePage"
import LoginPage from '../components/loginPage/LoginPage'
import RegisterPage from "../components/registerPage/RegisterPage"
import AppView from '../views/AppView'
import { useSelector } from "react-redux"

function Routes() {
    const myUser = useSelector(state => state.AuthReducer.user)

    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/chat" component={myUser.id ? AppView : LoginPage} />
        </Switch>
    )
}

export default Routes;