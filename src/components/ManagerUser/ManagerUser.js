import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManagerUser = () => {
    const navigate = useNavigate();

    const account = JSON.parse(sessionStorage.getItem('account'));

    useEffect(() => {
        if(!account || !account.isAuthenticated) {
            navigate('/login');
        }
    }, [account])

    return (
        <div>
            <h1>Management user page</h1>
        </div>
    );
};

export default ManagerUser;