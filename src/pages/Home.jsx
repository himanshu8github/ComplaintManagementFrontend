import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const HomePage = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(containerRef.current, {
      opacity: 100,
      duration: 0.5,
    });

    tl.from(titleRef.current, {
      opacity: 100,
      y: -20,
      duration: 1,
      ease: 'power3.out',
    });

    tl.from(buttonRef.current.children, {
      opacity: 100,
      y: 20,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-800 text-white"
    >
      <h1
        ref={titleRef}
        className="text-5xl font-bold mb-8 tracking-wide drop-shadow-md"
      >
        Complaint Management System
      </h1>

      <div ref={buttonRef} className="flex gap-6">
        <Link
          to="/signup"
          className="bg-white text-indigo-700 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-100 transition-transform transform hover:scale-105"
        >
          Signup
        </Link>
        <Link
          to="/login"
          className="bg-white text-indigo-700 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-100 transition-transform transform hover:scale-105"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
