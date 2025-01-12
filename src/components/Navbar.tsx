"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdHome, MdWork, MdPages, MdEmail, MdMenu, MdClose } from "react-icons/md";
import { FaBlog } from "react-icons/fa";

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: <MdHome size={20} />,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: <MdWork size={20} />,
  },
  {
    name: "Blog",
    href: "/blog",
    icon: <FaBlog size={20} />,
  },
  {
    name: "Posts",
    href: "/posts",
    icon: <MdPages size={20} />,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: <MdEmail size={20} />,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Main Navbar */}
      <div className="bg-gray-900 h-16 w-full flex items-center justify-between text-white px-4 md:px-6">
        <div className="text-2xl font-bold text-[#0ff]">Dr. Abdul Shakoor</div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-x-12">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`h-16 flex flex-col items-center justify-center hover:text-[#0ff] ${
                pathname === item.href
                  ? "border-[#0ff] text-[#0ff] group border-b-4 font-bold"
                  : "border-gray-900 group border-b-4 font-bold"
              }`}
            >
              <Link
                href={item.href}
                className="w-full flex items-center justify-center"
              >
                <div>{item.name}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <ul className="bg-gray-900 text-white flex flex-col items-center gap-y-4 p-4 h-screen left-0 right-0 z-50 md:hidden">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`bg-gray-800 rounded-lg w-full flex items-center justify-center py-2 hover:text-[#0ff] ${
                pathname === item.href
                  ? "text-[#0ff] font-bold"
                  : "font-medium"
              }`}
            >
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
