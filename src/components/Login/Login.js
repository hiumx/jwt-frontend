import { Navigate, useNavigate } from 'react-router-dom'
import { useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import './Login.scss';
import { userLogin } from '../../services/userService';
import { AuthContext } from '../../contexts/AuthProvider';

export default function Login() {
    const navigate = useNavigate();
    const [keyLogin, setKeyLogin] = useState('');
    const [password, setPassword] = useState('');
    const passwordInputElement = useRef();

    const authContext = useContext(AuthContext);

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

                authContext.login({
                    isAuthenticated: true,
                    role: resData.responseData.userData.name,
                    username: resData.responseData.username,
                    accessToken: resData.responseData.accessToken
                });

                navigate('/manager-users');
            } else if (+resData.responseCode === -1) {
                toast.error(resData.responseMessage);
            }
        }
    }

    const handleKeyDownKeyLogin = e => {
        if (e.keyCode === 13 && passwordInputElement.current.value === '') {
            passwordInputElement.current.focus();
        } else if (e.keyCode === 13 && passwordInputElement.current.value !== '') {
            handleClickLogin();
        }
    }

    const handleKeyDownPassword = e => {
        if (e.keyCode === 13) {
            handleClickLogin();
        }
    }


    return (
        <>
            {authContext.userContext && authContext.userContext.isAuthenticated ? <Navigate to='/' /> :
                <div className='container login-container'>
                    <div className='row login-content'>
                        <div className='col-lg-6 col-md-12 col-sm-12 login-wrapper-title'>
                            <h1 className='login-title'>Login</h1>
                        </div>
                        <div className='col-lg-6 col-md-12 col-sm-12 login-wrapper-form justify-content-center'>
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
            }
        </>

    )
}
