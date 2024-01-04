import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {

    const account = JSON.parse(sessionStorage.getItem('account'));

    return (
        <>
            {account && account.isAuthenticated ? <Outlet /> : <Navigate to='/login' /> }
        </>

    );
};

export default PrivateRoutes;