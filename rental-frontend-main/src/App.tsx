import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MyBills from "./pages/MyBills";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import About from "./pages/About";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import AdminHome from "./admin/AdminHome";
import Payments from "./admin/Payments";
import Documents from "./admin/Documents";
import Apartments from "./admin/Apartments";
import Maintenance from "./admin/Maintenance";

const App: React.FC = () => {
   const location = useLocation();

  
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
     {!isAdminPage && <Header />}
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/bills" element={<MyBills />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/help" element={<Help />} />
      <Route path="/about" element={<About />} />
      <Route path="/auth" element={<Auth/>} />
      

    <Route path="/admin" element={<AdminHome/>} />
    <Route path="/admin/apartments" element={<Apartments/>} />
    <Route path="/admin/payments" element={<Payments/>} />
    <Route path="/admin/documents" element={<Documents/>} />
    <Route path="/admin/maintenance" element={<Maintenance/>} />
      
    </Routes>

    </>
  );
};

export default App;
