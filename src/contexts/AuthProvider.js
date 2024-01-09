const { createContext, useState, useContext } = require("react");

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [userContext, setUserContext] = useState({
        username: '',
        role: '',
        isAuthenticated: false,
        accessToken: ''
    });

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

    return (
        <AuthContext.Provider value={{ userContext, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext };
export default AuthProvider;