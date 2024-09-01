import React, {Component} from "react";
import { MdAlternateEmail } from "react-icons/md";
import './Forgot.css';
import axios from 'axios';

export class Forgot extends Component {
    handleSubmit = e => {
        e.preventDefault();

        const data = { email: this.email };

        axios.post('forgot', data).then(
            res => { console.log(res) }
        ).catch(
            err => { console.log(err) }
        )
    }
    
    render() {
        return(
            <div className='wrapper'>
                <form onSubmit={this.handleSubmit}>
                    <h1>Forgot Password</h1>
                    <div className='input-box'>
                        <input type='email' placeholder='Email' onChange={e => this.email = e.target.value} required />
                        <MdAlternateEmail className='icon' />
                    </div>
        
                    <button type='submit'>Next</button>

                </form>
            </div>
        );
    }
}