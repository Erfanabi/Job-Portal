import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

function RecruiterLogin() {
  const [state, setState] = useState("Login");
  //   const [image, setImage] = useState("");

  const { setIsOpen } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex items-center justify-center"
      onClick={() => setIsOpen(false)}
    >
      <form
        className="bg-white p-10 rounded-xl z-20 text-slate-500 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer z-20"
          onClick={() => setIsOpen(false)}
        />

        <h1 class="text-center text-2xl text-neutral-700 font-medium">
          Recruiter {state === "Login" ? "Login" : "Sign Up"}
        </h1>
        <p class="text-sm">Welcome back! Please sign in to continue </p>

        <div class="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.person_icon} alt="" />
          <input
            class="outline-none text-sm"
            type="text"
            placeholder="Company Name"
            required=""
            value=""
          />
        </div>

        <div class="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.email_icon} alt="" />
          <input
            class="outline-none text-sm"
            type="email"
            placeholder="Email Id"
            required=""
            value="google@demo.com"
          />
        </div>

        {state === "SignUp" && (
          <div class="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.lock_icon} alt="" />
            <input
              class="outline-none text-sm"
              type="password"
              placeholder="Password"
              required=""
              value="12345678"
            />
          </div>
        )}

        {state === "Login" && (
          <p class="text-sm text-blue-600 mt-4 cursor-pointer">
            Forgot password?
          </p>
        )}
        <button
          type="submit"
          class="bg-blue-600 w-full text-white py-2 rounded-full mt-4"
        >
          {state === "Login" ? "login" : "sign up"}
        </button>

        <p class="mt-5 text-center">
          Don't have an account?{" "}
          {state === "Login" ? (
            <span
              class="text-blue-600 cursor-pointer"
              onClick={() => setState("SignUp")}
            >
              Sign Up
            </span>
          ) : (
            <span
              class="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          )}
        </p>

        {/* <div className="flex items-center gap-4 my-10">
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
              className="w-16 rounded-full"
            />
            <input
              src={image}
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              id="image"
              hidden
            />
          </label>
          <p>
            Upload Company <br /> logo
          </p>
        </div> */}
      </form>
    </div>
  );
}

export default RecruiterLogin;
