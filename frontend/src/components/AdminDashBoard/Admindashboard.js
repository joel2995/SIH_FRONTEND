import React from 'react';
import AdminSidebar from '../Adminbar';
import './Admindashboard.css';

const AdminDashBoard = ({ children }) => {
    return (
        <div className="dashboard-layout">
            <AdminSidebar />
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default AdminDashBoard;