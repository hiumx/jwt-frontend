import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const PrivateRoutes = () => {
    const authContext = useContext(AuthContext);

    return (
        <>
            {authContext.userContext && authContext.userContext.isAuthenticated ? <Outlet /> : <Navigate to='/login' /> }
        </>

    );
};

export default PrivateRoutes;