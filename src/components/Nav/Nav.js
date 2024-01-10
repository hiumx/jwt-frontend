import { NavLink, useLocation } from 'react-router-dom';
import _ from 'lodash';
import './Nav.scss';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

export default function Nav() {

    const location = useLocation();
    const authContext = useContext(AuthContext);

    return (
        <>
            {authContext && !_.isEmpty(authContext.userContext) && authContext.userContext.isAuthenticated && location.pathname !== '/login' &&
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
                        <p className='username'>Hi! {authContext.userContext.username}</p>
                        <p className='user-role'>Role: {authContext.userContext.role}</p>
                    </div>
                    <div className='logout'>

                        <NavLink to="/login" onClick={authContext.logout}>
                            <span className='nav-icon'>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </span>
                            Log out
                        </NavLink>
                    </div>
                </div>
            }
        </>

    )
}
