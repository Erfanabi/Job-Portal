import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import RecruiterLogin from "./RecruiterLogin";
import { AppContext } from "../context/AppContext";

function Navbar() {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const navigate = useNavigate();

  const { isOpen, setIsOpen } = useContext(AppContext);

  return (
    <>
      <div className="shadow py-4">
        <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
          <img
            className="cursor-pointer"
            src={assets.logo}
            onClick={() => navigate("/")}
            alt=""
          />

          {user ? (
            <div className="flex items-center gap-3">
              <Link to={"/applications"}>Applied Jobs</Link>
              <p>|</p>
              <p className="max-sm:hidden">
                Hi, {(user.firstName = " " + user.lastName)}
              </p>
              <UserButton />
            </div>
          ) : (
            <div className="flex gap-4 max-sm:text-xs">
              <button className="text-gray-600" onClick={() => setIsOpen(true)}>
                Recruiter Login
              </button>
              <button
                className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
                onClick={() => openSignIn()}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>

      {isOpen && <RecruiterLogin />}
    </>
  );
}

export default Navbar;
