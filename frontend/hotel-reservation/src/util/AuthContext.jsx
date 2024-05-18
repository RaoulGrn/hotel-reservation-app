import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider!"
    );
  }

  return authContext;
};

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    try {
      return storedToken ? JSON.parse(storedToken) : { user: null, jwt: "" };
    } catch (error) {
      console.error("Failed to parse token from localStorage:", error);
      return { user: null, jwt: "" };
    }
  });
  const returnUrl = "/";

  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const token = await response.text();
        localStorage.setItem("user", JSON.stringify(username));
        localStorage.setItem("token", token);
        setUser(username);
        setToken(token);
        navigate(returnUrl || "/");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Failed to login:", error);
      throw new Error("Failed to login");
    }
  };

  const logout = () => {
    setUser("");
    setToken({ user: null, jwt: "" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const authContextValues = {
    user,
    token,
    returnUrl,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
};
