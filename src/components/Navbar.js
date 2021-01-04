import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

const Navbar = () => (
    <Router>
        <div>
            <NavigationalLinks />
            <SwitchComponent />
        </div>
    </Router>
);

const NavigationalLinks = () => (
    <nav>
        <Link to="/">Home</Link> |
        <Link to="/search">Search</Link> |
        <Link to="/create">Create</Link>
    </nav>
);

/* A <Switch> looks through its children <Route>s and
    renders the FIRST one that matches the current URL. */
const SwitchComponent = () => (
    
    <Switch>
        <Route path="/search" component={SearchPage} />
        <Route path="/create" component={CreatePage} />
        <Route path="/" component={HomePage} />
    </Switch>
);

export default Navbar;

// --------------------------
const HomePage = () => (
    <h2>Home page</h2>
);

const SearchPage = () => (
    <h2>Search page</h2>
);

const CreatePage = () => (
    <h2>Create page</h2>
);