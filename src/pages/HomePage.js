import React from 'react';
import Navbar from '../components/Navbar';
import Typography from '@material-ui/core/Typography';

const HomePage = () => (
    <div>
        <Navbar />

        <Typography variant="h6">
            Welcome to the fammenu-frontend!
        </Typography>
    </div>
);

export default HomePage;