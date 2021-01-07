import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import VisibilityIcon from '@material-ui/icons/Visibility';

const Navbar = () => (
    <div>
        <nav>
            <Button color="primary" component={Link} to="/">
                <HomeIcon /> Home
            </Button>

            <Button color="primary" component={Link} to="/view">
                <VisibilityIcon />View
            </Button>
        </nav>
    </div>
);

export default Navbar;