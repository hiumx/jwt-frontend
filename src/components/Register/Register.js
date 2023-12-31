import React from 'react'
import './Register.scss'
import { useNavigate } from 'react-router-dom'

export default function Register() {

    const navigate = useNavigate();

    const handleClickRedirectLogin = () => {
        navigate('/login')
    }

    return (
        <div className='container register-container'>
            <div className='row register-content'>
                <div className='col-lg-6 col-xs-12 register-wrapper-title'>
                    <h1 className='register-title'>Register</h1>
                </div>
                <div className='col-lg-6 col-xs-12 register-wrapper-form'>
                    <div className='register-form'>
                        <form>
                            <div className="mb-3 input-form-item">
                                <label htmlFor='email'>Email</label>
                                <input type="text" className="form-control" placeholder='Enter email' id='email' />
                            </div>
                            <div className="mb-3 input-form-item">
                                <label htmlFor='phone'>Phone</label>
                                <input type="text" className="form-control" placeholder='Enter Phone' id='phone' />
                            </div>
                            <div className="mb-3 input-form-item">
                                <label htmlFor='username'>Username</label>
                                <input type="text" className="form-control" placeholder='Enter username' id='username' />
                            </div>
                            <div className="mb-3 input-form-item">
                                <label htmlFor='password'>Password</label>
                                <input type="password" className="form-control" placeholder='Enter password' id='password' />
                            </div>
                            <div className="mb-3 input-form-item">
                                <label htmlFor='re-password'>Re-Password</label>
                                <input type="password" className="form-control" placeholder='Enter re-password' id='re-password' />
                            </div>
                            <button type="submit" className="btn btn-primary register-btn">Register</button>
                        </form>
                        <div className="separate-line"></div>
                        <button type="button" className="btn btn-success redirect-login-btn" onClick={handleClickRedirectLogin}>You already have account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
