import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from './AxiosInstance'; // Assuming you have Axios instance set up

const Login = ({ setAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await AxiosInstance.post('api/token/', {
                username,
                password,
            });
            console.log(response);

            // Store tokens in localStorage
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            AxiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;

            // Set authenticated state to true
            setAuthenticated(true);

            // Redirect to the calendar page after login
            navigate('/calendar');
        } catch (error) {
            setError('Invalid credentials. Please try again.');
            console.error('Login error:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
