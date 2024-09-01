// src/components/UserProfile.js
import React from 'react';
import { Typography } from '@mui/material';
import './All.css';

const UserProfile = () => {
    return (
        <div className="container">
            <Typography variant="h4">User Profile</Typography>
            <Typography variant="body1">
                This is the user profile page where you can view and edit your profile.
            </Typography>
        </div>
    );
};

export default UserProfile;