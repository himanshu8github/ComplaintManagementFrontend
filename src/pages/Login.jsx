import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Navbar from './Navbar';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.from(formRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from(buttonRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      delay: 1,
      ease: 'back.out(1.7)',
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);

      navigate(user.role === 'admin' ? '/admin' : '/submit');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-500 to-purple-600 px-4">
      <form
        ref={formRef}
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Login</h2>

        {error && (
          <p className="text-red-500 text-center font-medium mb-4">{error}</p>
        )}

        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block font-medium mb-1">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          ref={buttonRef}
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
}
