import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const Navbar = () => (
    <div>
        <nav>
            <Link to="/"><HomeIcon /></Link> |
            <Link to="/search"><SearchIcon /></Link> |
            <Link to="/create"><AddCircleIcon /></Link>
        </nav>
    </div>
);

export default Navbar;