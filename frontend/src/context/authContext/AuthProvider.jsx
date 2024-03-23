import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { auth } from "../../services/firebase/config";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubstribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (isLoading) {
        setIsLoading(false);
      }
    });

    return unsubstribe;
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = { user, login, logout, isLoading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
