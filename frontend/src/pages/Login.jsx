import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.log("Invalid credentials ", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md border border-gray-200 p-8 rounded-2xl w-full max-w-md flex flex-col gap-5"
      >
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center text-red-600">
          Login Form
        </h2>

        {/* Email Input */}
        <input
          required
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-red-500 transition-all"
        />

        {/* Password Input */}
        <input
          required
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-red-500 transition-all"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition-all duration-200"
        >
          Login
        </button>

        {/* Optional Note */}
        <p className="text-sm text-gray-500 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-red-500 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
