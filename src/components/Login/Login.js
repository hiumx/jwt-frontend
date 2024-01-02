import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react';
import './Login.scss';
import { userLogin } from '../../services/userService';
import { toast } from 'react-toastify';

export default function Login({ setIsLoginSuccess }) {
    const navigate = useNavigate();
    const [keyLogin, setKeyLogin] = useState('');
    const [password, setPassword] = useState('');
    const passwordInputElement = useRef();

    const handleClickRegister = () => {
        navigate('/register')
    }

    const validateInputLogin = () => {
        if (!keyLogin) {
            toast.error('Please enter your email or phone number');
            return false;
        }

        if (!password) {
            toast.error('Please enter your password');
            return false;
        }

        return true;
    }

    const handleClickLogin = async () => {
        if (validateInputLogin()) {
            const resData = await userLogin(keyLogin, password);
            if (+resData.responseCode === 0) {
                toast.success(resData.responseMessage);

                setIsLoginSuccess(true);

                const dataSessionStorage = {
                    isAuthenticated: true,
                    token: 'Fake token'
                }
                sessionStorage.setItem('account', JSON.stringify(dataSessionStorage));

                navigate('/manager-user');
            } else if (+resData.responseCode === -1) {
                toast.error(resData.responseMessage);
            }
        }
    }

    const handleKeyDownKeyLogin = e => {
        if(e.keyCode === 13) {
            passwordInputElement.current.focus();
        }
    }

    const handleKeyDownPassword = e => {
        if(e.keyCode === 13) {
            handleClickLogin();
        }
    }

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
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Enter email or phone number'
                                    value={keyLogin}
                                    onChange={e => setKeyLogin(e.target.value)}
                                    onKeyDown={e => handleKeyDownKeyLogin(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder='Password'
                                    value={password}
                                    ref={passwordInputElement}
                                    onChange={e => setPassword(e.target.value)}
                                    onKeyDown={e => handleKeyDownPassword(e)}
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary login-btn"
                                onClick={handleClickLogin}
                            >
                                Login
                            </button>
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
