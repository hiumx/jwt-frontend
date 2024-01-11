import { useNavigate } from "react-router-dom";
import { getInfoAccount } from "../services/userService";
import { setAuthToken } from "../config/axios";

const { createContext, useState, useContext, useEffect } = require("react");

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [userContext, setUserContext] = useState({
        username: '',
        role: '',
        isAuthenticated: false,
        accessToken: ''
    });

    const navigate = useNavigate();

    const login = (userData) => {
        setUserContext(userData);
    }

    const logout = () => {
        setUserContext({
            username: '',
            role: '',
            isAuthenticated: false,
            accessToken: ''
        })
    }

    useEffect(() => {
        const fetchInfoAccount = async () => {
            setAuthToken();
            const resData = await getInfoAccount();
            if(resData.responseCode === 0) {
                const userInfo = {
                    isAuthenticated: true,
                    role: resData.responseData.userData.name,
                    username: resData.responseData.username,
                    accessToken: ''
                }
                setUserContext(userInfo);
            } else if(resData.responseCode === -1) {
                setUserContext({...userContext, isAuthenticated: false});
                navigate('/');
            }
        }
        fetchInfoAccount();
    }, [])

    return (
        <AuthContext.Provider value={{ userContext, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext };
export default AuthProvider;