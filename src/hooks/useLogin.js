import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth"
import useShowToast from "./useShowToast"
import { doc, getDoc } from "firebase/firestore";
import {auth, firestore} from '../firebase/Firebase'
import useAuthStore from "../store/authStore";  

export default function useLogin() {
  const showToast = useShowToast()
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth)
  const loginUser = useAuthStore((state) => state.login);     
  const Login = async(inputs) => {
    if (!inputs.email || !inputs.password) {
        return showToast("Error", "Please fill all the fields", "error");
    }
    try {
        const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password)
        if(userCred) {
            const docRef = doc(firestore, "users", userCred.user.uid)
            const docSnap = await getDoc(docRef)
            localStorage.setItem('user-info', JSON.stringify(docSnap.data()))
            loginUser(docSnap.data())
        }
    } catch (error) {
        showToast("Error", error.message, "error");
    }
  }


  return {
    loading,
    error,
    Login
  }
}
