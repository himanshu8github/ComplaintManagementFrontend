import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../pages/Navbar';

export default function SubmitComplaint() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Product',
    priority: 'Medium',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/api/complaints`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message || 'Complaint submitted successfully');
      setFormData({
        title: '',
        description: '',
        category: 'Product',
        priority: 'Medium',
      });
    } catch (error) {
      console.error('Submit error:', error);
      setMessage(
        error.response?.data?.error || 'Failed to submit complaint'
      );
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl border">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Submit a Complaint
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring"
            >
              <option value="Product">Product</option>
              <option value="Service">Service</option>
              <option value="Support">Support</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Priority</label>
            <div className="flex gap-4 mt-1">
              {['Low', 'Medium', 'High'].map((level) => (
                <label key={level} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value={level}
                    checked={formData.priority === level}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition"
          >
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>

          {message && (
            <p
              className={`text-center text-sm mt-2 font-medium ${
                message.toLowerCase().includes('fail') ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
