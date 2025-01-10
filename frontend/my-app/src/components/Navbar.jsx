import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg font-bold">SecureSphere</h1>
        <ul className="flex space-x-4">
          <li>
            <Link className="text-gray-300 hover:text-white" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="text-gray-300 hover:text-white" to="/security-logs">
              Security Logs
            </Link>
          </li>
          <li>
            <Link className="text-gray-300 hover:text-white" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;