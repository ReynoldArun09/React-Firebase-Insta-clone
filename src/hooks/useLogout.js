import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";


export default function useLogout() {
  const [signOut, isLogginOut, error] = useSignOut(auth);
  const logoutUser = useAuthStore(state => state.logout)
  const showToast = useShowToast();
  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      logoutUser()
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return {
    handleLogout,
    isLogginOut,
    error,
  };
}
