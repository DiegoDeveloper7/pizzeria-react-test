// src/context/UserProvider.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

// Crear y exportar el contexto
export const UserContext = createContext();

// Hook para consumir fácilmente el contexto
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [email, setEmail] = useState(() => localStorage.getItem("email") || null);

  // Instancia de Axios configurada
  const api = useMemo(
    () =>
      axios.create({
        baseURL: "http://localhost:5001/api",
      }),
    []
  );

  // Sincronizar token
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token, api]);

  // Sincronizar email
  useEffect(() => {
    if (email) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }
  }, [email]);

  // LOGIN centralizado
  const login = async ({ email, password }) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      // Ajusta según lo que devuelva tu backend: token y email
      setToken(data.token);
      setEmail(data.email);
      return { ok: true };
    } catch (err) {
      const error = err.response?.data?.error || "Error al iniciar sesión";
      return { ok: false, error };
    }
  };

  const register = async ({ email, password }) => {
    try {
      const { data } = await api.post("/auth/register", { email, password });
      setToken(data.token);
      setEmail(data.email);
      return { ok: true };
    } catch (err) {
      const error = err.response?.data?.error || "Error al registrarse";
      return { ok: false, error };
    }
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
  };

  const fetchMe = async () => {
    try {
      if (!token) return null;
      const { data } = await api.get("/auth/me");
      return { ok: true, data };
    } catch (err) {
      const error = err.response?.data?.error || "Error al obtener el perfil";
      return { ok: false, error };
    }
  };

  return (
    <UserContext.Provider
      value={{
        token,
        email,
        login,
        register,
        logout,
        fetchMe,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};