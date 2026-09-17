import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; 

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedInUser, setIsLoggedInUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    setIsLoggedInUser(localStorage.getItem("token"));
  }, [location]);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-col w-[90%] mx-auto pt-[1.5rem]">
      <div className="flex justify-between items-center">
        <div className="flex gap-[1rem] items-center">
          <img
            src="/currency.png" // Retaining the same logo
            alt="KrishiConnect Logo"
            className="w-[2.5rem] h-[2.5rem] cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1
            className="text-[2rem] font-bold cursor-pointer text-[#219653]"
            onClick={() => navigate("/")}
          >
            KrishiConnect
          </h1>
        </div>
        <div className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? (
            <FaTimes className="text-[2rem] cursor-pointer" />
          ) : (
            <FaBars className="text-[2rem] cursor-pointer" />
          )}
        </div>
        <div className={`hidden md:flex gap-[2rem] items-center`}>
          <p
            className="text-[1rem] cursor-pointer hover:text-[#219653] font-medium"
            onClick={() => navigate("/")}
          >
            Home
          </p>
          <p
            className="text-[1rem] cursor-pointer hover:text-[#219653] font-medium"
            onClick={() => navigate("/marketplace")}
          >
            Marketplace
          </p>
          <p
            className="text-[1rem] cursor-pointer hover:text-[#219653] font-medium"

            onClick={() => navigate("/aboutus")}
          >
            About Us
          </p>
          <p
            className="text-[1rem] cursor-pointer hover:text-[#219653] font-medium"

            onClick={() => navigate("/contactUs")}
          >
            Contact Us
          </p>
          {isLoggedInUser && (
            <>
              <p
                className="text-[1rem] cursor-pointer hover:text-[#219653] font-medium"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </p>
              {user.userType === 'farmer' && (
                <p
                  className="text-[1rem] cursor-pointer hover:text-[#219653] font-medium"
                  onClick={() => navigate("/dashboard", { state: { activeTab: 'marketplace' } })}
                >
                  My Products
                </p>
              )}
            </>
          )}
        </div>

        {isLoggedInUser ? (
          <div className="flex items-center gap-4">
            <span className="text-[#219653] font-semibold hidden md:block">
              Hi, {JSON.parse(localStorage.getItem("user") || "{}").fullName || "User"}
            </span>
            <div
              className="hidden md:block bg-gradient-to-r from-[#219653] to-[#6fcf97] rounded-lg px-[1.5rem] py-[0.5rem] cursor-pointer text-white text-[0.9rem] font-semibold"
              onClick={onLogout}
            >
              Logout
            </div>
          </div>
        ) : (
          <div className="hidden md:flex gap-[1rem] items-center">
            <p
              className="text-[1rem] cursor-pointer hover:text-[#219653] font-medium"
              onClick={() => navigate("/login")}
            >
              Login
            </p>
            <div
              className="bg-gradient-to-r from-[#219653] to-[#6fcf97] rounded-lg px-[1.5rem] py-[0.5rem] cursor-pointer text-white text-[0.9rem] font-semibold"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-start mt-[1rem] gap-[1rem]">
          <p
            className="text-[1rem] cursor-pointer hover:text-[#219653] font-medium"

            onClick={() => {
              navigate("/");
              toggleMenu();
            }}
          >
            Home
          </p>
          <p
            className="text-[1rem] cursor-pointer hover:text-[#219653] font-medium"

            onClick={() => {
              navigate("/marketplace");
              toggleMenu();
            }}
          >
            Marketplace
          </p>
          <p
            className="text-[1rem] cursor-pointer hover:text-[#219653] font-medium"
            onClick={() => {
              navigate("/aboutus");
              toggleMenu();
            }}
          >
            About Us
          </p>
          <p
            className="text-[1rem] cursor-pointer hover:text-[#219653] font-medium"
            onClick={() => {
              navigate("/contactUs");
              toggleMenu();
            }}
          >
            Contact Us
          </p>
          {isLoggedInUser && (
            <>
              <p
                className="text-[1rem] cursor-pointer hover:text-[#219653] font-medium"
                onClick={() => {
                  navigate("/dashboard");
                  toggleMenu();
                }}
              >
                Dashboard
              </p>
              {user.userType === 'farmer' && (
                <p
                  className="text-[1rem] cursor-pointer hover:text-[#219653] font-medium"
                  onClick={() => {
                    navigate("/dashboard", { state: { activeTab: 'marketplace' } });
                    toggleMenu();
                  }}
                >
                  My Products
                </p>
              )}
            </>
          )}
          {isLoggedInUser ? (
            <div className="flex flex-col gap-2">
              <span className="text-[#219653] font-semibold">
                Hi, {JSON.parse(localStorage.getItem("user") || "{}").fullName || "User"}
              </span>
              <div
                className="bg-gradient-to-r from-[#219653] to-[#6fcf97] rounded-lg px-[1.5rem] py-[0.5rem] cursor-pointer text-white text-[0.9rem] font-semibold text-center"
                onClick={() => {
                  onLogout();
                  toggleMenu();
                }}
              >
                Logout
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-[1rem]">
              <p
                className="text-[1rem] cursor-pointer hover:text-[#219653] font-medium"

                onClick={() => {
                  navigate("/login");
                  toggleMenu();
                }}
              >
                Login
              </p>
              <div
                className="bg-gradient-to-r from-[#219653] to-[#6fcf97] rounded-lg px-[1.5rem] py-[0.5rem] cursor-pointer text-white text-[0.9rem] font-semibold"

                onClick={() => {
                  navigate("/signup");
                  toggleMenu();
                }}
              >
                Get Started
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Nav;
