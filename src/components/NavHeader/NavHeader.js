import { Link, NavLink, useLocation } from 'react-router-dom';
import _ from 'lodash';
import './NavHeader.scss';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

export default function NavHeader() {

    const location = useLocation();
    const authContext = useContext(AuthContext);

    const {username, role, isAuthenticated} = authContext.userContext;

    const handleClickLogout = () => {
        authContext.logout();
        localStorage.removeItem('jwtToken');
    }

    return (
        <>
            {authContext && !_.isEmpty(authContext.userContext) && location.pathname !== '/login' &&
                <div className="topnav">
                    <div className='navigate'>
                        <NavLink to="/">
                            <span className='nav-icon'>
                                <i className="fa-solid fa-house"></i>
                            </span>
                            Home
                        </NavLink>
                        <NavLink to="/users">
                            <span className='nav-icon'>
                                <i className="fa-solid fa-user"></i>
                            </span>
                            Users
                        </NavLink>
                        <NavLink to="/manager-projects">
                            <span className='nav-icon'>
                                <i className="fa-solid fa-diagram-project"></i>
                            </span>
                            Projects
                        </NavLink>
                        <NavLink to="/about">
                            <span className='nav-icon'>
                                <i className="fa-solid fa-address-card"></i>
                            </span>
                            About
                        </NavLink>
                    </div>
                    <div className='wrapper-user-info'>
                        {username && <p className='username'>Hi! {username}</p>}
                        {role && <p className='user-role'>Role: {role}</p>}
                    </div>
                    <div className='logout'>

                        <Link to={isAuthenticated ? "/" : "/login"} onClick={isAuthenticated ? () => handleClickLogout() : () => {}}>
                            <span className='nav-icon'>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </span>
                            {isAuthenticated ? 'Log out' : 'Login'}
                            
                        </Link>
                    </div>
                </div>
            }
        </>

    )
}
