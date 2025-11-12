import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (name, email, password) => {
    const { data } = await axiosInstance.post("/user/register", {
      name,
      email,
      password,
    });
    setUser(data);
  };

  const login = async (email, password) => {
    const { data } = await axiosInstance.post("/user/login", {
      email,
      password,
    });
    console.log(data);
    setUser(data.data.user || data.data.data);
  };

  const logout = async () => {
    await axiosInstance.post("/user/logout");
    setUser(null);
  };

  const islogged = async () => {
    try {
      const { data } = await axiosInstance.get("/user/islogged");
      setUser(data.data);
    } catch (error) {
      setUser(null);
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
