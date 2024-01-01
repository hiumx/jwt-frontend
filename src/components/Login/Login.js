import { useNavigate } from 'react-router-dom'
import './Login.scss'
import { useEffect } from 'react';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();

    const handleClickRegister = () => {
        navigate('/register')
    }

    useEffect(() => {
        // axios.get('http://localhost:8888/api-test')
        //     .then(res => console.log(res))
    }, []);

    return (
        <div className='container login-container'>
            <div className='row login-content'>
                <div className='col-lg-6 col-xs-12 login-wrapper-title'>
                    <h1 className='login-title'>Login</h1>
                </div>
                <div className='col-lg-6 col-xs-12 login-wrapper-form'>
                    <div className='login-form'>
                        <form>
                            <h4 className='login-form-title'>Account login</h4>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder='Enter email or phone number' />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" placeholder='Password' />
                            </div>
                            <button type="submit" className="btn btn-primary login-btn">Login</button>
                        </form>
                        <a href='#' className='login-forgot-password-link'>Forgotten password?</a>
                        <div className="separate-line"></div>
                        <button type="button" className="btn btn-success" onClick={handleClickRegister}>Create new account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
