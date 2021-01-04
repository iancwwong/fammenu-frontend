import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

// Pages
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import CreatePage from '../pages/CreatePage';

/* A <Switch> looks through its children <Route>s and
    renders the FIRST one that matches the current URL. */
const Routes = () => (
    <Router>
        <Switch>
            <Route path="/search" component={SearchPage} />
            <Route path="/create" component={CreatePage} />
            <Route path="/" component={HomePage} />
        </Switch>
    </Router>
);

export default Routes;
