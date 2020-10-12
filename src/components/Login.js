import React from "react";
import "../styles/Login.css";
import { auth, provider } from "../firebase";
import { Button } from "@material-ui/core";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert.apply(error));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img src="./logo.jpg" alt="" />
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
