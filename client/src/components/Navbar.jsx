import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post a Job" },
  ];
  return (
    <header>
      <nav>
        <a href="/" className="flex items-center gap-2 text-2xl">
          <img
            src="./images/Linear.png"
            alt="logo"
            className="size-8 gap-3 left-5 top-5"
          />
          Job Portal
        </a>
        {/* nav for large devices */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Signup and login */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          <Link to="/login" className="text-primary">
            Log in
          </Link>
          <Link to="/signup" className="text-primary">
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
