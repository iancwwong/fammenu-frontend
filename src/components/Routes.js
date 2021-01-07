import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

// Pages
import HomePage from '../pages/HomePage';
import ViewFoodItems from '../pages/ViewFoodItems';

/* A <Switch> looks through its children <Route>s and
    renders the FIRST one that matches the current URL. */
const Routes = () => (
    <Router>
        <Switch>
            <Route path="/view" component={ViewFoodItems} />
            <Route exact={true} path="/" component={HomePage} />
        </Switch>
    </Router>
);

export default Routes;
