// src/components/Settings.js
import React from 'react';
import { Typography } from '@mui/material';
import './All.css';

const Settings = () => {
    return (
        <div className="container">
            <Typography variant="h4">Settings</Typography>
            <Typography variant="body1">
                This is the settings page where you can configure your preferences.
            </Typography>
        </div>
    );
};

export default Settings;