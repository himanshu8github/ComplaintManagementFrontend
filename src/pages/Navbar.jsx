import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Navbar = () => {
  const navRef = useRef(null);
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem('token'));
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null); 
    navigate('/login');
  };

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -40,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="bg-indigo-600 text-white shadow-md py-3 px-6 flex justify-between items-center"
    >
      <h1 className="text-xl font-bold tracking-wider">ComplaintHub 🚀</h1>

      <div className="space-x-4 text-sm md:text-base">
        <Link to="/" className="hover:underline hover:text-yellow-300">
          Home
        </Link>

        {!token && (
          <>
            <Link to="/signup" className="hover:underline hover:text-yellow-300">
              Signup
            </Link>
            <Link to="/login" className="hover:underline hover:text-yellow-300">
              Login
            </Link>
          </>
        )}

        {token && (
          <>
            {role === 'admin' && (
              <Link to="/admin" className="hover:underline hover:text-yellow-300">
                Dashboard
              </Link>
            )}
            {role !== 'admin' && (
              <Link to="/submit" className="hover:underline hover:text-yellow-300">
                Submit
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
