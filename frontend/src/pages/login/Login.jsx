import { useState } from "react";

import useAuth from "../../context/authContext/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import styles from "./Login.module.css";

const Login = ({ setNotify }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { login, logout, currentUser, isLoading } = useAuth();

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
      setNotify({ message: "", level: "" });
      navigate((state && state.path) || "/blog");
    } catch (error) {
      setNotify({ message: error.message, level: "error" });
      setTimeout(() => {
        setNotify({ message: "", level: "" });
      }, 5000);
    }
    setLoading(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignOut = async () => {
    try {
      await logout();
      console.log("signed out successfully");
      setNotify({ message: "", level: "" });
      navigate("/");
    } catch (error) {
      setNotify({ message: error.message, level: "error" });
      setTimeout(() => {
        setNotify({ message: "", level: "" });
      }, 5000);
    }
  };

  if (isLoading) return <Spinner />;

  return currentUser ? (
    <button onClick={handleSignOut} className={`btn ${styles["btn-signout"]}`}>
      Sign Out
    </button>
  ) : (
    <form onSubmit={handleLogin} className={styles.form}>
      <div></div>
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
