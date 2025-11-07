import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPass, setRepeatPass] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        else if (name === 'password') setPassword(value);
        else if (name === 'repeat-password') setRepeatPass(value);
        else if (name === 'email') setEmail(value);
    };

    const handleSubmit = async (e) => {
        console.log("Submitted")
        e.preventDefault();
        setError('');

        if (!username || !password || !email) {
            setError("All fields are required.");
            return;
        }
        if (password !== repeatPass) {
            setError("Passwords do not match.");
            return;
        }

        const server_address = import.meta.env.VITE_SERVER_HOST;

        try {
            const response = await axios.post(`${server_address}/account/signup`, {
                username,
                password,
                email
            });

            if (response.status === 200) {
                alert("Signup successful! Please login.");
                navigate('/login');
            } else {
                setError("Signup failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    }
    
    return (
        <>
            <form onSubmit={handleSubmit} className="login">
                <h2>
                    <section>Sign UP</section>
                    <Link to = "/">x</Link>    
                </h2>

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleInput}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleInput}
                    required
                />

                <label htmlFor="repeat-password">Repeat Password</label>
                <input
                    type="password"
                    id="repeat-password"
                    name="repeat-password"
                    value={repeatPass}
                    onChange={handleInput}
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleInput}
                    required
                />

                <section className="login-btns">
                    <button type="submit">Signup</button>
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                </section>

                {error && <p className="error-message">{error}</p>}
            </form>
        </>
    ); 
}

export default Signup