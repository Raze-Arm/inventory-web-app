import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import history from "../history";

import SuccessMessage from "./app-message/SuccessMessage";
import ErrorMessage from "./app-message/ErrorMessage";
import Login from "./auth/Login";
import Logout from "./auth/Logout";

import AppRoutes from "./AppRoutes";
import ModalErrorMessage from "./app-message/ModalErrorMessage";
import PasswordRecoveryPage from "./auth/PasswordRecoveryPage";


import './404Page.css';

class App extends React.Component {


    render() {
        return (
            <React.Fragment>
                <SuccessMessage />
                <ErrorMessage />
                <ModalErrorMessage />


                    <Router history={history}>
                        <Switch>
                            <Route exact path={'/login'} component={Login} />
                            <Route  path={'/login/passwordrecovery/:success?'} component={PasswordRecoveryPage} />
                            <Route exact path={'/logout'} component={Logout} />
                            <AppRoutes />
                        </Switch>
                    </Router>

            </React.Fragment>
        );
    }
}


export default App;