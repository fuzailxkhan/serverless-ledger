import { useState } from 'react';
import './login-page.css';
import axios from 'axios';

interface LoginPageInterface {
    onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageInterface) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loader state

    const handleLogin = () => {
        setLoading(true); // Start loading
        axios.post('/api/login', { password })
            .then((res) => {
                if (res.data.success) {
                    onLogin();
                } else {
                    setError('Invalid password');
                }
            })
            .catch(() => setError('Login failed'))
            .finally(() => setLoading(false)); // Stop loading
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <div className="login-card">
            <h2>Welcome</h2>
            <h1>Fuzail Khan</h1>
            {!loading ?<form onSubmit={handleSubmit}>
                <div className="input-button-div">
                    <input
                        placeholder="Enter password..."
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading} // Disable input while loading
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Enter'}
                    </button>
                </div>
            </form>
             :<div className="loader"></div>} {/* Add a spinner */}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default LoginPage;
