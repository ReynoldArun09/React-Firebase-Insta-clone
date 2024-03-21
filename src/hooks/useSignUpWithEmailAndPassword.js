import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {firestore, auth } from "../firebase/Firebase";

import { setDoc, doc, query, where, collection, getDocs } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

export default function useSignUpWithEmailAndPassword() {
  const showToast = useShowToast()
  const loginUser = useAuthStore(state => state.login)
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const signup = async (inputs) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.username ||
      !inputs.fullName
    ) {
      showToast("Error", "Please fill all the fields", "error");
    }

    const usersRef = collection(firestore, "users")
    const q = query(usersRef, where("username", "==", inputs.username))
    const querySnapshot = await getDocs(q)

    
		if (!querySnapshot.empty) {
			showToast("Error", "Username already exists", "error");
			return;
		}

    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullName: inputs.fullName,
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc)
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return {
    signup,
    loading,
    error,
  };
}
