import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import history from "../history";

import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import Login from "./auth/Login";
import Logout from "./auth/Logout";

import AppRoutes from "./AppRoutes";
import Loading from "./Loading";


class App extends React.Component {


    render() {
        return (
            <React.Fragment>
                <SuccessMessage />
                <ErrorMessage />
                <Loading />

                    <Router history={history}>
                        <Switch>
                            <Route exact path={'/login'} component={Login} />
                            <Route exact path={'/logout'} component={Logout} />
                            <AppRoutes />
                        </Switch>
                    </Router>

            </React.Fragment>
        );
    }
}


export default App;