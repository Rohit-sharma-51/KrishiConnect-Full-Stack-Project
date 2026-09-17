import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [user, setUser] = useState({
    phone: "",
    password: "",
  });

  const onSignIn = async () => {
    try {
      if (!user.phone || !user.password) {
        toast.error("Please fill all fields");
        return;
      }

      const API_URL =
        process.env.REACT_APP_API_URL || "http://localhost:8000";

      const response = await axios.post(
        `${API_URL}/api/login`,
        user
      );

      if (response.data.status === 200) {
        console.log("Login response:", response.data);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        console.log("Token stored:", response.data.token);

        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.log("Signin failed", error);

      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };
  return (
    <>
      <div className="flex flex-col w-[25rem] mt-[10vh] container gap-[1.5rem] mx-auto mb-[5rem]">
        <Toaster position="top-center" />

        <div>
          <h1 className="merriweather-font font-bold text-[2rem]">
            Welcome Back
          </h1>

          <p className="text-gray-600 mt-2">
            फोन नंबर और पासवर्ड डालने के बाद “Sign In” बटन पर क्लिक करें।
          </p>
        </div>

        <div className="flex flex-col">
          <h2 className="merriweather-font font-bold text-[1rem]">
            Phone Number
          </h2>

          <input
            type="tel"
            className="border-2 border-zinc-300 px-[1rem] py-[0.6rem] rounded-md"
            name="phone"
            id="phone"
            value={user.phone}
            onChange={(e) =>
              setUser({ ...user, phone: e.target.value })
            }
            placeholder="अपना फोन नंबर लिखें or Enter your phone number"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="merriweather-font font-bold text-[1rem]">
            Password
          </h2>

          <input
            type="password"
            className="border-2 border-zinc-300 px-[1rem] py-[0.6rem] rounded-md"
            name="password"
            id="password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
            placeholder="अपना पासवर्ड लिखें or Enter your password"
          />
        </div>

        <button
          className="w-full bg-gradient-to-r from-[#219653] to-[#6fcf97] text-white py-3 rounded-lg hover:from-[#27ae60] hover:to-[#219653] transition-all duration-300 font-semibold"
          onClick={onSignIn}
        >
          Sign In
        </button>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-[#219653] cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>

          <b>OR</b>
          <br />

          अगर आपने अकाउंट नहीं बनाया है, तो इस बटन पर क्लिक करें ={" "}
          <span
            className="text-[#219653] cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;