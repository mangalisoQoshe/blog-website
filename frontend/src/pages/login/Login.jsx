import { useState } from "react";
import { auth } from "../../services/firebase/config";
import {signInWithEmailAndPassword,signOut} from  "firebase/auth"

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });



  const handleLogin = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      signInWithEmailAndPassword(auth,input.email,input.password)
      .then((userCredentail)=>{
        const user = userCredentail.user
        console.log(user)
      })
      .catch((err)=>{
        console.log(err.message)
      })
      return;
    }
    alert("please provide a valid input");
  };

  const handleInput = (e) => {
  
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
   
  };

  const handleSignOut=()=>{
    signOut(auth)
    .then(()=>{
      console.log("signed out successfully")
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
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
      <button className="btn-submit">Login</button>
    </form>
  );
};

export default Login;
