import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Balance from '../components/Balance';
import Form from '../components/Form';

const Routes = props => {
    return (
        <Switch>
            <Route key={1} component={Balance} path="/balance"/>
            <Route key={2} component={Form} path="/form"/>
            <Redirect from="/" to="/balance" />
        </Switch>

    );
};

export default Routes;