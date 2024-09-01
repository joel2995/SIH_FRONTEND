import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock, FaUnlock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [passView, setView] = useState(false);
    const [username, setUsername] = useState(''); // Username input state
    const [password, setPassword] = useState(''); // Password input state
    const [message, setMessage] = useState(''); // For displaying feedback messages
    const navigate = useNavigate();

    const toggle = () => {
        setView(!passView);
    };

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || 'An error occurred. Please try again.');
                return;
            }

            // Uncomment if you need to handle session state updates
            /*
            if (data.is_logged_in) {
                setMessage('User is already logged in on another system.');
                return;
            }

            await fetch('http://localhost:5000/api/update_login_state', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: data.user_id,
                    is_logged_in: true,
                }),
            });
            */

            const userRole = data.role;
            if (userRole === 'admin') {
                navigate('/AdminDash');
            } else if (userRole === 'employee') {
                navigate('/dashboard');
            } else {
                setMessage('Unknown role.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className='wrapper2'>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className='input-box'>
                    <input 
                        type='text' 
                        placeholder='Username' 
                        onChange={handleUsername} 
                        required 
                    />
                    <FaUser className='icon'/>
                </div>
                <div className='input-box'>
                    <input 
                        type={passView ? 'text' : 'password'} 
                        placeholder='Password' 
                        onChange={handlePassword} 
                        required 
                    />
                    <span onClick={toggle}>
                        {passView ? <FaUnlock className='icon' /> : <FaLock className='icon' />}
                    </span>
                </div>

                <button type='submit'>Login</button>

                {message && <p>{message}</p>}

                <div className='register-link'>
                    <p>Don't have an account? <Link to='/signup'>Register</Link></p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;