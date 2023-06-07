import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import api from "../api/api";
import {logout} from "../api/users";


import { useNavigate } from 'react-router-dom';
const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("token");
      console.log(token)
      if (token) {
        const { data: user } = await api.get("users/me");
        if (user) setUser(user);
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async ({ email, password }) => {
    const { data } = await api.post("users/login", { email, password });
    const token = data.token;
    if (token) {
      Cookies.set("token", token, { expires: 7 });
      api.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await api.get("users/me");
      setUser(user);
      console.log(user)
    }
  };

  const Logout =  async () => {
    await logout();
    Cookies.remove("token");
    setUser(null);
    delete api.defaults.headers.Authorization;
    navigate('/')
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);