import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const SignupPage = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    adminKey: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    gsap.from(formRef.current, {
      opacity: 100,
      y: 30,
      duration: 1,
      ease: 'power2.out',
    });
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      if (formData.role === 'admin') {
        payload.adminKey = formData.adminKey;
      }

      const res = await axios.post('http://localhost:3000/api/auth/register', payload);
      setSuccess(res.data.message || 'Registered successfully');

      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-purple-400 p-4">
      <div
        ref={formRef}
        className="w-full max-w-md bg-white shadow-xl rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {formData.role === 'admin' && (
            <input
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
              type="text"
              name="adminKey"
              placeholder="Admin Secret Key"
              value={formData.adminKey}
              onChange={handleChange}
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
          {success && <p className="text-green-500 mt-3 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
