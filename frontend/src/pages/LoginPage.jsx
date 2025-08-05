import React, { useState } from 'react';
import '../styles/LoginPage.css';
import axios from '../api/axios'; // ✅ Axios instance (baseURL -> /api)
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // <-- changed to /auth/login
      const res = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('✅ Logged in successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert('❌ Invalid credentials or user does not exist');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card shadow-lg p-4 rounded">
        <h2 className="text-center mb-4">Welcome Back 🧘‍♂️</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          New user? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
