import { createContext, useContext, useState } from "react";
import { authService } from "../services/authService";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("eventoria_user") || "null"),
  );
  const save = ({ user: nextUser, token }) => {
    const preparedUser = {
      ...nextUser,
      id: nextUser.id || nextUser._id,
      avatar:
        nextUser.avatar ||
        nextUser.name
          ?.split(" ")
          .map((x) => x[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
      joined: nextUser.joined || "Recently",
    };
    localStorage.setItem("eventoria_user", JSON.stringify(preparedUser));
    localStorage.setItem("eventoria_token", token);
    setUser(preparedUser);
  };
  const login = async (data) => {
    const result = await authService.login(data);
    save(result);
    return result;
  };
  const register = async (data) => {
    const result = await authService.register(data);
    save(result);
    return result;
  };
  const logout = () => {
    localStorage.removeItem("eventoria_user");
    localStorage.removeItem("eventoria_token");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
