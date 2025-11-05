import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../provider/AuthProvider";
import axios from "axios";
import './login.css'

const Login = () => {
    const { setToken, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");


    const from = location.state?.from || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        
        const server_address = import.meta.env.VITE_SERVER_HOST;
        const username = e.target.username.value;
        const password = e.target.password.value;

        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }
    
        try {
            const response = await axios.post(server_address + '/account/login', {username, password});

            if (response.data?.token) {
                setToken(response.data.token);
                setUser(response.data.user);
                navigate(from, { replace: true });
            } else {
                setError("Invalid server response. Please try again later.");
            }
            // console.log(response.data.token)
            // setToken(response.data.token);
            // navigate(from, {replace: true});
        } catch (err) {
            // console.error('Login Failed', err);
            // navigate('/login?error')
            console.error("Login Failed:", err);
            if (err.response?.status === 401) {
                setError("Invalid username or password.");
            } else if (err.response?.status === 404) {
                setError("Server not found. Please try again later.");
            } else {
                setError("Login failed. Please check your connection or try again.");
            }
        }
    }


    
    return (
        <>
            <form onSubmit={handleSubmit} className="login">
                <h2>
                    <section>Login</section>
                    <Link to = "/">x</Link>    
                </h2>

                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />

                <section className="login-btns">
                    <button type="submit">Login</button>
                    <button onClick={() => {
                        navigate('/signup');
                    }}>Sign Up</button>


                </section>
                {error && <p className="error-message">{error}</p>}

            </form>
        </>
    )
}

export default Login