import axios from 'axios';
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(localStorage.getItem('token'));
    const [user, setUser_] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    const setToken = (newToken) => {
        setToken_(newToken);
    }
    const setUser = (userData) => {
        setUser_(userData)
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer" + token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token');
        }
    }, [token])

    useEffect(() => {
        if(user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            user,
            setUser
        }),
        [token, user]
    );

    return (
        <AuthContext.Provider value = {contextValue}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {return useContext(AuthContext)};

export default AuthProvider;