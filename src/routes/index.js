import { Route, Switch } from 'react-router-dom'
import HomePage from "../components/homePage/HomePage"
import LoginPage from '../components/loginPage/LoginPage'
import LogoutPage from '../components/logoutPage/LogoutPage'
import RegisterPage from "../components/registerPage/RegisterPage"
import AppView from '../views/AppView'

const routes = [
    {
        path: "/",
        exact: true,
        main: () => <HomePage />
    },
    {
        path: "/login",
        exact: true,
        main: () => <LoginPage />
    },
    {
        path: "/register",
        exact: true,
        main: () => <RegisterPage />
    },
    {
        path: "/logout",
        exact: true,
        main: () => <LogoutPage />
    },
    {
        path: "/chat",
        exact: true,
        main: () => <AppView />
    }
]

const AppRoute = () => {
    var result = null;

    result = routes.map((item, index) => {
        return (
            <Route key={index} exact={item.exact} path={item.path} component={item.main} />
        )
    })

    return result
}

function Routes() {
    return (
        <Switch>
            <AppRoute />
        </Switch>
    )
}

export default Routes;