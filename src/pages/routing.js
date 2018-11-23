import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from './home';
import Login from './login';
import ForgotPassword from './forgot-password';
import Dashboard from './dashboard';
import withAuthorization from '../common/hoc/with-auth';

export const Routing = () => (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path="/forgot-password" component={ForgotPassword}/>
            <Route exact path="/dashboard" component={withAuthorization(Dashboard)}/>
        </Switch>
);