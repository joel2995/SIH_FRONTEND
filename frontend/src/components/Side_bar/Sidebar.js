// Sidebar.js

import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="sidebar-container">
            <Typography variant="h6" className="sidebar-title" onClick={() => navigate('/dashboard')}>
                Dashboard
            </Typography>
            <List component="nav">
                <ListItem className="sidebar-item" component={Link} to="/settings">
                    <ListItemText primary="Settings" />
                </ListItem>
                <Divider className="sidebar-divider" />
                <ListItem className="sidebar-item" component={Link} to="/collab-work">
                    <ListItemText primary="Collab Work" />
                </ListItem>
                <Divider className="sidebar-divider" />
                <ListItem className="sidebar-item" component={Link} to="/upgrade">
                    <ListItemText primary="Upgrade" />
                </ListItem>
                <Divider className="sidebar-divider" />
                <ListItem className="sidebar-item" component={Link} to="/profile">
                    <ListItemText primary="User Profile" />
                </ListItem>
            </List>
        </div>
    );
};

export default Sidebar;
