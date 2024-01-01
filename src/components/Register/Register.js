import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import './Register.scss';
import axios from 'axios';

export default function Register() {

    const navigate = useNavigate();

    const handleClickRedirectLogin = () => {
        navigate('/login')
    }

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidInput, setIsValidInput] = useState({
        email: true,
        phone: true,
        username: true,
        password: true,
        confirmPassword: true,
    });

    const validateInput = () => {

        if (!email || !email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            toast.error('Email invalid!')
            setIsValidInput({ ...isValidInput, email: false })
            return false;
        }

        if (!phone) {
            toast.error('Please enter phone number!')
            setIsValidInput({ ...isValidInput, phone: false })
            return false;
        }

        if (!username) {
            toast.error('Please enter username!')
            setIsValidInput({ ...isValidInput, username: false })
            return false;
        }

        if (!password ||
            !password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
        ) {
            toast.error('Password must be 6 -16 characters and has least a number, least a special character')
            setIsValidInput({ ...isValidInput, password: false })
            return false;
        }

        if (!confirmPassword) {
            toast.error('Please enter confirm password!')
            setIsValidInput({ ...isValidInput, confirmPassword: false })
            return false;
        }

        if (password !== confirmPassword) {
            toast.error('Confirm password not match!')
            setIsValidInput({ ...isValidInput, confirmPassword: false })
            return false;
        }

        return true;
    }

    const freeInputData = () => {
        setEmail('');
        setPhone('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    }

    const handleClickRegister = () => {
        if (validateInput()) {
            freeInputData();
            axios.post('http://localhost:8888/api/v1/create', {
                email, phone, username, password
            })
                .then(() => { })
                .catch()
        }
        // axios.get('http://localhost:8888/api/v1/api-test')
        //     .then(data => console.log(data))
    }

    return (
        <div className='container register-container'>
            <div className='row register-content'>
                <div className='col-lg-6 col-xs-12 register-wrapper-title'>
                    <h1 className='register-title'>Register</h1>
                </div>
                <div className='col-lg-6 col-xs-12 register-wrapper-form'>
                    <form className='register-form'>
                        <div className="mb-3 input-form-item">
                            <label htmlFor='email'>Email</label>
                            <input
                                type="text"
                                className={isValidInput.email ? "form-control" : "form-control is-invalid"}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder='Enter email'
                                id='email'
                            />
                        </div>
                        <div className="mb-3 input-form-item">
                            <label htmlFor='phone'>Phone</label>
                            <input
                                type="text"
                                className={isValidInput.phone ? "form-control" : "form-control is-invalid"}
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                placeholder='Enter Phone'
                                id='phone'
                            />
                        </div>
                        <div className="mb-3 input-form-item">
                            <label htmlFor='username'>Username</label>
                            <input
                                type="text"
                                className={isValidInput.username ? "form-control" : "form-control is-invalid"}
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder='Enter username'
                                id='username'
                            />
                        </div>
                        <div className="mb-3 input-form-item">
                            <label htmlFor='password'>Password</label>
                            <input
                                type="password"
                                className={isValidInput.password ? "form-control" : "form-control is-invalid"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder='Enter password'
                                id='password'
                            />
                        </div>
                        <div className="mb-3 input-form-item">
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input
                                type="password"
                                className={isValidInput.confirmPassword ? "form-control" : "form-control is-invalid"}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder='Enter confirm password'
                                id='confirmPassword'
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary register-btn"
                            onClick={handleClickRegister}
                        >
                            Register
                        </button>
                        <div className="separate-line"></div>
                        <button type="button" className="btn btn-success redirect-login-btn" onClick={handleClickRedirectLogin}>You already have account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
