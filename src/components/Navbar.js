import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const Navbar = () => (
    <div>
        <nav>
            <Button color="primary" component={Link} to="/">
                <HomeIcon /> Home
            </Button>

            <Button color="primary" component={Link} to="/search">
                <SearchIcon />View
            </Button>

            <Button color="primary" component={Link} to="/create">
                <AddCircleIcon />Create
            </Button>
        </nav>
    </div>
);

export default Navbar;