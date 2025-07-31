import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RecruiterLogin() {
  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isCompany: true,
  });

  const {
    setIsOpen,
    backendUrl,
    setCompanyToken,
    setCompanyData,
    setUserData,
  } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      state === "Login"
        ? backendUrl + "/auth/sign-in"
        : backendUrl + "/auth/sign-up";

    const role = formData.isCompany ? "company" : "user";

    const dataToSend =
      state === "Login"
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            role,
          };

    try {
      const { data } = await axios.post(endpoint, dataToSend);
      toast.success(data.message);

      if (data?.accessToken) {
        setCompanyToken(data.accessToken);
        localStorage.setItem("companyToken", data.accessToken);

        if (data.user.role === "company") {
          console.log(data.user);

          setCompanyData(data.user);
          navigate("/dashboard");
        } else {
          setUserData(data.user);
        }
      }

      setIsOpen(false);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex items-center justify-center"
      onClick={() => setIsOpen(false)}
    >
      <form
        className="bg-white p-8 rounded-xl z-20 text-slate-500 relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <img
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer z-20"
          onClick={() => setIsOpen(false)}
        />

        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruiter {state === "Login" ? "Login" : "Sign Up"}
        </h1>
        <p className="text-sm text-center">
          {state === "Login"
            ? "Welcome back! Please sign in to continue"
            : "Create your recruiter account below"}
        </p>

        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.email_icon} alt="" />
          <input
            className="outline-none text-sm w-full"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {state === "SignUp" ? (
          <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.person_icon} alt="" />
            <input
              className="outline-none text-sm w-full"
              type="text"
              placeholder="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        ) : (
          <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.lock_icon} alt="" />
            <input
              className="outline-none text-sm w-full"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {state === "SignUp" && (
          <>
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none text-sm w-full"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <label className="flex items-center gap-2 mt-4 text-sm cursor-pointer">
              <input
                type="checkbox"
                name="isCompany"
                checked={formData.isCompany}
                onChange={handleChange}
              />
              Registering as a company
            </label>
          </>
        )}

        {state === "Login" && (
          <p className="text-sm text-blue-600 mt-4 cursor-pointer">
            Forgot password?
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 rounded-full mt-4"
        >
          {state === "Login" ? "Login" : "Sign Up"}
        </button>

        <p className="mt-5 text-center text-sm">
          {state === "Login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() =>
              setState((prev) => (prev === "Login" ? "SignUp" : "Login"))
            }
          >
            {state === "Login" ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default RecruiterLogin;
