import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginForm from './components/Login_Page/Login';
import SignupForm from './components/Signup_Page/Signup';
import Dashboard from  './components/Dashboard/Dashboard';
import WebSocketClient from './components/Websocket/websocket';
import Settings from './components/Bar/Setting';
import CollabWork from './components/Bar/CollabWork';
import Upgrade from './components/Bar/Upgrade';
import UserProfile from './components/Bar/UserProfile';
import Sidebar from './components/Side_bar/Sidebar';
import AdminDashBoard from './components/AdminDashBoard/Admindashboard';
import UserLogs from './components/pages/UserLogs';
import AdminProfile from './components/pages/AdminProfile';
import DatasetUploads from './components/pages/DatasetUpload';
import AdminSettings from './components/pages/Settings';
import UploadPage from '//components/Upload/Upload';

import './App.css';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  // Determine whether to show the sidebar
  const showSidebar =  location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/';

  return (
    <div style={{ display: 'flex', height:'auto' }}>
      {showSidebar && <Sidebar />}
      <WebSocketClient />
      <div style={{ flexGrow: 1, padding: '20px', backgroundColor: '#ecf0f1' }}>
        <Routes>
          <Route path='/' element={<SignupForm />} /> {/*navigate to Signup page */}
          <Route path='/login' element={<LoginForm />} /> {/*navigate to Login page */}
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/admindash' element={<AdminDash />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/collab-work" element={<CollabWork />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/upload-page" element={<UploadPage />} />
          <Route path="/user-logs" element={<UserLogs />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/dataset-uploads" element={<DatasetUploads />} />
          <Route path="/settings" element={<AdminSettings />} />

        </Routes>
      </div>
    </div>
  );
};
export default App;