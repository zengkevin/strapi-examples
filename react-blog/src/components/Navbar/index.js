import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from './rocket.png';


export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={Logo} alt="logo" />
      </Link>
    </div>
  );
}