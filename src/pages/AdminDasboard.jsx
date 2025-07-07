import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../pages/Navbar';


const API_BASE_URL = "https://complain-sysytem-backend-pvo3.vercel.app";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE_URL}/api/complaints`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComplaints(res.data);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
      }
    };

    fetchComplaints();
  }, []);

  const handleResolve = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE_URL}/api/complaints/${id}`,
        { status: "Resolved" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updated = complaints.map((c) =>
        c._id === id ? { ...c, status: "Resolved" } : c
      );
      setComplaints(updated);
    } catch (err) {
      console.error("Error resolving complaint:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/api/complaints/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filtered = complaints.filter((c) => c._id !== id);
      setComplaints(filtered);
    } catch (err) {
      console.error("Error deleting complaint:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 bg-white shadow-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c._id} className="border-t">
                <td className="p-3">{c.title}</td>
                <td className="p-3">{c.category}</td>
                <td className="p-3">{c.priority}</td>
                <td className="p-3">{c.status}</td>
                <td className="p-3 flex gap-2">
                  {c.status !== "Resolved" && (
                    <button
                      onClick={() => handleResolve(c._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Mark Resolved
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {complaints.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
