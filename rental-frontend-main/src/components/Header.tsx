import React, { useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="main-header">
      {/* LEFT - Logo */}
      <div className="logo">RentEase</div>

      {/* HAMBURGER (Mobile Only) */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* CENTER - Navigation */}
      <nav className={`nav-center ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <button className="nav-btn">Home</button>
        </Link>

        <Link to="/bills" onClick={() => setMenuOpen(false)}>
          <button className="nav-btn">My Bills</button>
        </Link>

        <Link to="/profile" onClick={() => setMenuOpen(false)}>
          <button className="nav-btn">Profile</button>
        </Link>

        <Link to="/help" onClick={() => setMenuOpen(false)}>
          <button className="nav-btn">Help</button>
        </Link>

        <Link to="/about" onClick={() => setMenuOpen(false)}>
          <button className="nav-btn">About</button>
        </Link>
      </nav>

      {/* RIGHT - User Icon */}
      <div className="user-section">
        <div className="user-icon">
          <Link className="user-icon-btn" to="/auth"><FaUser /></Link>
        </div>
      </div>
    </header>
  );
};

export default Header;