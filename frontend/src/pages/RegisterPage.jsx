import React, { useState } from 'react';
import '../styles/RegisterPage.css';
import axios from '../api/axios'; // ✅ Using our axios instance
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/register', { email, password });
      alert('✅ Registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('❌ Error: Email might already exist or server is unreachable.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card shadow-lg p-4 rounded">
        <h2 className="text-center mb-4">Create Your Wellness Account 🌿</h2>
        <form onSubmit={handleRegister}>
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
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
        <p className="text-center mt-3">
          Already registered? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
