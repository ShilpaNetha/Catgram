// NavBar.tsx
import React from "react";
import { HiUpload } from "react-icons/hi";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-900 to-black p-4 flex justify-between items-center">
      <Link to="/">
        <img src={Logo} width="80" height="80" />{" "}
      </Link>
      <Link to="/upload">
        <HiUpload className="text-yellow-500 w-10 h-10 cursor-pointer" />
      </Link>
      <div className="flex items-center">
        <img
          src="https://img.icons8.com/office/40/user.png"
          alt="User Profile"
          className="rounded-full border-2 border-white"
        />
      </div>
    </nav>
  );
};

export default NavBar;
