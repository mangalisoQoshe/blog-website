import { useState } from "react";

import useAuth from "../../context/authContext/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { login, logout, user,isLoading } = useAuth();

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

  return isLoading ? (
    <Spinner />
  ) : user ? (
    <button onClick={handleSignOut}>Sign Out</button>
  ) : (
    <form onSubmit={handleLogin}>
      <div className="form_control">
        <label htmlFor="user-email">Email:</label>
        <input
          type="email"
          id="user-email"
          name="email"
          aria-describedby="user-email"
          aria-invalid="false"
          required
          onChange={handleInput}
        />
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          aria-describedby="user-password"
          aria-invalid="false"
          onChange={handleInput}
        />
      </div>
      <button disabled={loading} className="btn-submit">
        Login
      </button>
    </form>
  );
};

export default Login;
