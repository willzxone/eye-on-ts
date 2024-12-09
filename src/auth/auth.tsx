import "@/assets/scss/App.scss";
import { useState } from "react";
import Signin from "./signin";
import Signup from "./signup";
const Auth = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => setIsActive(true);
  const handleLoginClick = () => setIsActive(false);

  return (
    <div
      className={`container ${isActive ? "active" : ""} forimage`}
      id="container"
    >
      <Signup />
      <Signin />
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button
              type="button"
              className="trans"
              id="login"
              onClick={handleLoginClick}
            >
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all site features</p>
            <button
              type="button"
              className="trans"
              id="register"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
