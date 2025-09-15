import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import RecruiterLogin from "./RecruiterLogin";
import { AppContext } from "../context/AppContext";

function Navbar() {
  const navigate = useNavigate();
  const { isOpen, setIsOpen, userData, setUserData, setUserToken } =
    useContext(AppContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShowNavbar(true);
        setLastScrollY(window.scrollY);
        return;
      }
      if (window.scrollY > lastScrollY) {
        // Scroll Down
        setShowNavbar(false);
      } else {
        // Scroll Up
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`w-full bg-gradient-to-tr from-blue-900 to-blue-600 text-white shadow sticky top-0 z-50 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 py-3 px-4">
          {/* Logo & Title */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={assets.logo} alt="لوگو انجمن" className="w-14 sm:w-18" />
            <span className="font-bold text-base sm:text-lg md:text-xl hidden sm:block">
              انجمن دانشگاه خیام
            </span>
          </div>

          {/* Main Links */}
          <div className="flex gap-4 items-center text-sm sm:text-base">
            <Link to="/" className="hover:text-blue-200 transition">
              خانه
            </Link>
            <Link to="/events" className="hover:text-blue-200 transition">
              رویدادها
            </Link>
            <Link to="/about" className="hover:text-blue-200 transition">
              درباره انجمن
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-800 font-bold px-3 py-1.5 rounded-lg shadow hover:bg-blue-100 transition hidden sm:inline"
            >
              ثبت‌نام رویداد
            </Link>
          </div>

          {/* User Section */}
          {userData ? (
            <div className="flex items-center gap-3">
              <Link
                to={"/applications"}
                className="hover:text-blue-200 transition"
              >
                درخواست‌های من
              </Link>
              <div className="relative group flex items-center gap-2 cursor-pointer">
                <img
                  src={userData?.image ? userData?.image : assets.avatar}
                  alt="پروفایل"
                  className="w-9 h-9 border-2 border-blue-300 rounded-full shadow"
                />
                <span className="max-sm:hidden">{userData.name}</span>
                <div className="absolute hidden group-hover:block top-10 right-0 z-20 text-black rounded min-w-[120px]">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm shadow">
                    <li
                      className="py-1 px-2 cursor-pointer pr-10 hover:bg-blue-50 text-right"
                      onClick={() => {
                        localStorage.removeItem("userToken");
                        setUserData(null);
                        setUserToken(null);
                        navigate("/");
                      }}
                    >
                      خروج
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 sm:gap-4 max-sm:text-xs">
              <button
                className="bg-white text-blue-800 font-bold px-5 py-1.5 rounded-full shadow hover:bg-blue-100 transition"
                onClick={() => setIsOpen(true)}
              >
                ورود
              </button>
            </div>
          )}
        </div>
      </nav>
      {isOpen && <RecruiterLogin />}
    </>
  );
}

export default Navbar;
