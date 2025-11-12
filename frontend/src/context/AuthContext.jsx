import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast"; // ✅ import toast

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Register
  const register = async (name, email, password) => {
    try {
      const { data } = await axiosInstance.post("/user/register", {
        name,
        email,
        password,
      });
      setUser(data);
      toast.success("Registered Successfully 🎉");
    } catch (error) {
      console.error("Register Error:", error);
      toast.error(error.response?.data?.message || "Registration Failed ❌");
    }
  };

  // ✅ Login
  const login = async (email, password) => {
    try {
      const { data } = await axiosInstance.post("/user/login", {
        email,
        password,
      });
      setUser(data.data.user || data.data.data);
      toast.success("Logged in Successfully 🚀");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Invalid Credentials ❌");
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await axiosInstance.post("/user/logout");
      setUser(null);
      toast.success("Logged out Successfully 👋");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(error.response?.data?.message || "Logout Failed ❌");
    }
  };

  // ✅ Check Login
  const islogged = async () => {
    try {
      const { data } = await axiosInstance.get("/user/islogged");
      setUser(data.data);
    } catch (error) {
      setUser(null);
      console.warn("User not logged in");
    }
  };

  useEffect(() => {
    islogged();
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
