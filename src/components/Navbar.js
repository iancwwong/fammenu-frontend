import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <div>
        <nav>
            <Link to="/">Home</Link> |
            <Link to="/search">Search</Link> |
            <Link to="/create">Create</Link>
        </nav>
    </div>
);

export default Navbar;