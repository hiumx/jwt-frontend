import { NavLink, useLocation } from 'react-router-dom';
import _ from 'lodash';
import './Nav.scss';
export default function Nav() {

    const account = JSON.parse(sessionStorage.getItem('account'));
    const location = useLocation();

    return (
        <>
            {account && !_.isEmpty(account) && account.isAuthenticated && location.pathname !== '/login' &&
                <div className="topnav">
                    <NavLink to="/">
                        <span className='nav-icon'>
                            <i className="fa-solid fa-house"></i>
                        </span>
                        Home
                    </NavLink>
                    <NavLink to="/manager-users">
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
            }
        </>

    )
}
