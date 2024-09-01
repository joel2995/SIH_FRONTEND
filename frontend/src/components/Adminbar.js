// Sidebar.js

import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const AdminSidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="sidebar-container">
            <Typography variant="h6" className="sidebar-title" onClick={() => navigate('/admindash')}>
               Admin Dashboard
            </Typography>
            <List component="nav">
                <ListItem className="ad-sidebar-item" component={Link} to="/user-logs">
                    <ListItemText primary="User Logs" />
                </ListItem>
                <Divider className="sidebar-divider" />
                <ListItem className="sidebar-item" component={Link} to="/admin-profile">
                    <ListItemText primary="Admin Profile" />
                </ListItem>
                <Divider className="sidebar-divider" />
                <ListItem className="sidebar-item" component={Link} to="/dataset-view">
                    <ListItemText primary="View Dataset" />
                </ListItem>
                <Divider className="sidebar-divider" />
                <ListItem className="sidebar-item" component={Link} to="/settings">
                    <ListItemText primary="Settings" />
                </ListItem>
            </List>
        </div>
    );
};

export default AdminSidebar;
