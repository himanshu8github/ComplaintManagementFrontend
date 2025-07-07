import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./pages/Navbar";
import Signup from "./pages/Signup";        
import Login from "./pages/Login";
import SubmitComplaint from "./pages/SubmitComplaint";
import AdminDashboard from "./pages/AdminDasboard";  
import Home from "./pages/Home";

function AppLayout() {
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

 
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, [location]);

   const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
   
       {!isAuthPage && token && <Navbar />}

      <Routes>
     
        <Route path="/" element={<Home />} />
         <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
       

        <Route
          path="/submit"
          element={
            token && role === "user" ? (
              <SubmitComplaint />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

     
        <Route
          path="/admin"
          element={
            token && role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<h2 className="text-center mt-20">Page Not Found</h2>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
