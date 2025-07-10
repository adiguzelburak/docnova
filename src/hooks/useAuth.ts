import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import type { RootState } from "../store";

export const useAuth = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const token = Cookies.get("token");

  const isAuthenticated = !!(user?.jwt || token);

  return {
    isAuthenticated,
    user,
    loading,
    token,
  };
};
