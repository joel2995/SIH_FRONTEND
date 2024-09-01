import React , { useState }from 'react';
import './Signup.css';
import { FaUser, FaLock, FaUnlock, FaMobile } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const [passView, setView] = useState(false); //Used to see password
    const [password, setPass] = useState(''); //Contains password value for checking
    const [confirmPass, setConfPass] = useState(''); //Contains confirm password value for checking
    const [match, setMatch] = useState(true); //Used to check password is correctly being entered
    const [phone, setPho] = useState(''); //Contains phone no value for checking
    const [Phoval, setPhoVal] = useState(true); //Used to check for valid mobile no
    //const [phoneTouch, setPhoTouch] = useState(false); //Used to check field is entered or not
    const [email, setEmail] = useState(''); //Contains email value for checking
    const [mailVal, setmail] = useState(true); // Used to check 
    const [emailTouch, setEmailTouch] = useState(false); // Track if the email input has been touched
    const [username, setUsername] = useState(''); 
    const [message, setMessage] = useState(''); 
    const navigate = useNavigate(); //Used to navigate between different page
    const [role, setRole] = useState(''); //Used to assign role for each user

    const toggle = () => {
        setView(!passView);
    };

    const handlePass = (e) => {
        setPass(e.target.value);
    };
    
    const handleConfirmPass = (e) => {
        setConfPass(e.target.value);
        setMatch(e.target.value === password);
    };
    
    const handlePhone = (e) => {
        const input = (e.target.value);
        if (/^\d{0,10}$/.test(input)) {
            setPho(input);
        }
    };

    const PhoneBlur = () => {
        //setPhoTouch(true);
        setPhoVal(phone.length === 10)
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const EmailBlur = () => {
        setEmailTouch(true);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setmail(emailRegex.test(email));
    };
    
    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPass) {
            setMessage('Passwords do not match');
            return;
        }

        // Check if phone number is valid
        if (!Phoval) {
            setMessage('Phone number must be exactly 10 digits.');
            return;
        }

        // Check if email is valid
        if (!mailVal) {
            setMessage('Please enter a valid email address');
            return;
        }

        if (!role) {
            setMessage('Please select a role');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    phone_no: phone,
                    password,
                    role,
                }),
            });

            const data = await response.json();
            setMessage(data.message);

            if (response.ok) {
                // Redirect to the login page after successful signup
                navigate('/login');
            }
            
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return(
        <div className='wrapper1'>
            <form onSubmit={handleSignup}>
                <h1>Signup</h1>
                <div className='input-box'>
                    <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} required />
                    <FaUser className='icon'/>
                </div>

                <div className={`input-box ${mailVal ? '' : 'invalid'}`}>
                    <input type='text' placeholder='Email ID' value={email} onChange={handleEmail} onBlur={EmailBlur} required/>
                    <MdAlternateEmail className='icon' />
                    { emailTouch && !mailVal && <p className='error-message'>Please enter a valid email address</p>}
                </div>
                
                {/* <div className='input-box'>
                    <input type='text' placeholder='Phone No' value={phone} onChange={handlePhone} onBlur={PhoneBlur} required />
                    <FaMobile className='icon'/>
                    { !Phoval && (<p className='error-message'>Phone number must be exactly 10 digits.</p>)}
                </div> */}

                <div className='input-box'>
                    <label htmlFor='role'>Select Role:</label>
                    <select id='role' value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value=''>Select your role</option>
                        <option value='admin'>Admin</option>
                        <option value='employee'>Employee</option>
                    </select>
                </div>

                <div className='input-box'>
                    <input type={passView ? 'text' : 'password'} placeholder='Password' value={password} onChange={handlePass} required />
                    <span onClick={toggle}>{passView ? <FaUnlock className='icon' /> : <FaLock className='icon' />}</span>
                </div>

                <div className='input-box'>
                    <input type={passView ? 'text' : 'password'} placeholder='Confirm Password' value={confirmPass} onChange={handleConfirmPass} required />
                    <span onClick={toggle}>{passView ? <FaUnlock className='icon' /> : <FaLock className='icon' />}</span>
                    {!match && <p className='error-message'>Passwords do not match</p>}
                </div>
                

                <button type='submit'>Signup</button>

                {message && <p>{message}</p>}

                <div className='register-link'>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </div>
            </form>
        </div>
  );
};

export default SignupForm;