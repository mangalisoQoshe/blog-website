import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import PropTypes from "prop-types";
import { auth } from "../../services/firebase/config";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubstribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
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

  const value = { currentUser, login, logout, isLoading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes ={
  children:PropTypes.any.isRequired
}

export default AuthProvider;
