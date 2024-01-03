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
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/manager-users">Users</NavLink>
                    <NavLink to="/manager-projects">Projects</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
        }
        </>

    )
}
