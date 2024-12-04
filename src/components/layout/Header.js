import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-dark text-white py-3">
      <nav className="container">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/employees">Employee List</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/employees/create">Create Employee</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header; 