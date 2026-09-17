import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedInUser = localStorage.getItem('emailData');
    if (isLoggedInUser) {
      navigate('/');
    }
  }, [])

  const [user, setUser] = useState({
    fullname: "",
    phone: "",
    // email: "",
    password: "",
    country: "",
    userType: "buyer",
    language: "english",
    state: "",
    city: "",
    address: ""
  });

  const states = [
   
    'उत्तर प्रदेश',
'बिहार',
'राजस्थान',
'महाराष्ट्र',
'गुजरात',
'पंजाब',
'हरियाणा'
  ];

  const onSignup = async () => {
    try {
      if (!user.fullname || !user.password || !user.phone || !user.userType) {
        toast.error("Please fill all required fields");
        return;
      }

      console.log(user);
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
      const response = await axios.post(`${API_URL}/api/register`, user);
      console.log(response);

      if (response.data.status === 200) {
        toast.success("Registration successful! Please login.");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.log("Signup failed ", error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <>
      <div className="flex flex-col w-[25rem] mt-[5vh] container gap-[1.5rem] mx-auto mb-[5rem]">
        <div>
          <h1 className="merriweather-font font-bold text-[2rem]">
           Create Your Account
           (अपना अकाउंट बनाएं)

          </h1>
           सारी जानकारी भरने के बाद नीचे दिए गए “Create Account” बटन पर क्लिक करें।
          <p className="text-gray-600 mt-2">Join KrishiConnect as a farmer or buyer</p>
        </div>

        <div className="flex flex-col">
          <h2 className="merriweather-font font-bold text-[1rem]">Full Name *</h2>
          <input
            type="text"
            className="border-2 border-zinc-300 px-[1rem] py-[0.6rem] rounded-md"
            value={user.fullname}
            id="fullname"
            onChange={(e) => setUser({ ...user, fullname: e.target.value })}
            placeholder="अपना पूरा नाम लिखें or Enter your full name"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="merriweather-font font-bold text-[1rem]">I am a *</h2>
          <select
            className="border-2 border-zinc-300 px-[1rem] py-[0.6rem] rounded-md"
            value={user.userType}
            onChange={(e) => setUser({ ...user, userType: e.target.value })}
          >
            <option value="buyer">Buyer</option>
            <option value="farmer">किसान</option>
          </select>
        </div>

       

        <div className="flex flex-col">
          <h2 className="merriweather-font font-bold text-[1rem]">Phone Number *</h2>
          <input
            type="tel"
            className="border-2 border-zinc-300 px-[1rem] py-[0.6rem] rounded-md"
            value={user.phone}
            id="phone"
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            placeholder="अपना फोन नंबर लिखें or Enter your phone number"
          />
        </div>

        

        <div className="flex flex-col">
          <h2 className="merriweather-font font-bold text-[1rem]">Password *</h2>
          <input
            type="password"
            className="border-2 border-zinc-300 px-[1rem] py-[0.6rem] rounded-md"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="अपना पासवर्ड लिखें or Create a strong password"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="merriweather-font font-bold text-[1rem]">Country</h2>
          <input
            type="text"
            className="border-2 border-zinc-300 px-[1rem] py-[0.6rem] rounded-md"
            value={user.country}
            id="country"
            onChange={(e) => setUser({ ...user, country: e.target.value })}
            placeholder="अपना देश लिखें or Enter your country"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="merriweather-font font-bold text-[1rem]">State</h2>
          <select
            className="border-2 border-zinc-300 px-[1rem] py-[0.6rem] rounded-md"
            value={user.state}
            onChange={(e) => setUser({ ...user, state: e.target.value })}
          >
            <option value="">अपना राज्य चुनें or Select your state</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <h2 className="merriweather-font font-bold text-[1rem]">City</h2>
          <input
            type="text"
            className="border-2 border-zinc-300 px-[1rem] py-[0.6rem] rounded-md"
            value={user.city}
            onChange={(e) => setUser({ ...user, city: e.target.value })}
            placeholder="अपना शहर या गाँव लिखें or Enter your city"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="merriweather-font font-bold text-[1rem]">Address</h2>
          <textarea
            className="border-2 border-zinc-300 px-[1rem] py-[0.6rem] rounded-md"
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            placeholder="अपना पता लिखें or Enter your address"
            rows="3"
          />
        </div>

        <button
          onClick={onSignup}
          className="bg-gradient-to-r from-[#219653] to-[#6fcf97] text-white py-[0.8rem] px-[1rem] rounded-md hover:from-[#27ae60] hover:to-[#219653] transition-all duration-300 font-semibold"
        >
          Create Account
        </button>

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign In
            </span>
          </p>
          <b>OR</b><br></br>
          <p>अगर आपने पहले से अकाउंट बना रखा है, तो “Sign In” बटन पर क्लिक करें = <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign In
            </span></p>

        </div>
      </div>
    </>
  );
};

export default SignUp;
