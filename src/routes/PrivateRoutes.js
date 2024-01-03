import { Navigate, Outlet, Route } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = () => {

    const account = JSON.parse(sessionStorage.getItem('account'));


    return (
        <>
            {account && account.isAuthenticated ? <Outlet /> : <Navigate to='/login' /> }
        </>

    );
};

export default PrivateRoutes;