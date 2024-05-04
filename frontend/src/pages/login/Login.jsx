import { useState } from "react";

import useAuth from "../../context/authContext/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import styles from "./Login.module.css"

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });



  const [loading, setLoading] = useState(false);

  const { login, logout, currentUser,isLoading } = useAuth();

  const { state } = useLocation();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (input.email == "" && input.password == "") {
      alert("Please provide a valid input!");
      return;
    }

    try {
      setLoading(true);
      await login(input.email, input.password);
      console.log("Logged in successfully");
      navigate((state && state.path) || "/blog");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
  
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(input)
  };

  const handleSignOut = async () => {
    try {
      await logout();
      console.log("signed out successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if(isLoading) return <Spinner/>

  console.log(currentUser)

  return currentUser ? (
    <button onClick={handleSignOut} className={styles["btn-signout"]}>
      Sign Out
    </button>
  ) : (
    <form onSubmit={handleLogin} className={styles.form}>
      <div className={styles["form-control"]}>
        <label htmlFor="user-email">Email</label>
        <input
          type="email"
          id="user-email"
          name="email"
          placeholder="Email"
          aria-describedby="user-email"
          aria-invalid="false"
          required
          onChange={handleInput}
        />
      </div>
      <div className={styles["form-control"]}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          aria-describedby="user-password"
          aria-invalid="false"
          onChange={handleInput}
        />
      </div>
      <button disabled={loading} className={`btn ${styles["btn-submit"]}`}>
        Login
      </button>
    </form>
  );
};

export default Login;
