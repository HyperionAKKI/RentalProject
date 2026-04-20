import React, { useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="main-header">
      {/* LEFT - Logo */}
      <div className="logo">Admin Dashboard</div>

      {/* HAMBURGER (Mobile Only) */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* CENTER - Navigation */}
      <nav className={`nav-center ${menuOpen ? "active" : ""}`}>
        <Link to="/admin" onClick={() => setMenuOpen(false)}>
          <button className="nav-btn">Home</button>
        </Link>

        <Link to="/admin/payments" onClick={() => setMenuOpen(false)}>
          <button className="nav-btn">Payments</button>
        </Link>

        <Link to="/admin/apartments" onClick={() => setMenuOpen(false)}>
          <button className="nav-btn">Apartments</button>
        </Link>

        <Link to="/admin/documents" onClick={() => setMenuOpen(false)}>
          <button className="nav-btn">Documents</button>
        </Link>

        <Link to="/admin/maintenance" onClick={() => setMenuOpen(false)}>
          <button className="nav-btn">Maintenance</button>
        </Link>
      </nav>

      {/* RIGHT - User Icon */}
      <div className="user-section">
          <p>Logout</p>
        <div className="user-icon">
        
          <div className="user-icon-btn"><FaUser /></div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;