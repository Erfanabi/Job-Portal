import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { UserButton } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import RecruiterLogin from "./RecruiterLogin";
import { AppContext } from "../context/AppContext";

function Navbar() {
  // const { openSignIn } = useClerk();
  // const { user } = useUser();

  const navigate = useNavigate();

  const { isOpen, setIsOpen, userData, setUserData, setUserToken } =
    useContext(AppContext);

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

          {userData ? (
            <div className="flex items-center gap-3">
              <Link to={"/applications"}>درخواست‌های ارسال‌شده</Link>
              <p>|</p>
              <div className="relative group flex items-center gap-3">
                <p className="max-sm:hidden">سلام، {userData.name}</p>

                <div className="">
                  <img
                    src={userData?.image ? userData?.image : assets.avatar}
                    alt=""
                    className="w-8 border rounded-full"
                  />

                  <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                    <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                      <li
                        className="py-1 px-2 cursor-pointer pr-10"
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
            </div>
          ) : (
            <div className="flex gap-4 max-sm:text-xs">
              {/* <button className="text-gray-600" onClick={() => setIsOpen(true)}>
                Recruiter Login
              </button> */}
              <button
                className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
                onClick={() => setIsOpen(true)}
              >
                ورود
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
