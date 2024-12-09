import { useState } from "react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { auth } from "@/firebase/firebaseConfig";
import PasswordInput from "@/common/components/input/PasswordInput";
import "@/assets/scss/App.scss";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isResetLinkSent, setIsResetLinkSent] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setIsResetLinkSent(true);
      alert("Password reset email sent! Check your inbox.");
    } catch (error) {
      if ((error as FirebaseError).code === "auth/user-not-found") {
        alert("Invalid email! This email is not registered.");
      } else {
        alert((error as Error).message);
      }
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in successfully!");
      navigate("/home");
    } catch (error) {
      if (
        (error as FirebaseError).code === "auth/wrong-password" ||
        (error as FirebaseError).code === "auth/user-not-found"
      ) {
        alert("Invalid credentials! Please try again.");
      } else {
        alert((error as FirebaseError).message);
      }
    }
  };

  return (
    <div
      className={`form-con ${isResetLinkSent ? "show-signin" : "show-reset"}`}
    >
      {isResetLinkSent ? (
        <form onSubmit={handleSignIn}>
          <h1>Sign In</h1>
          <p>Welcome back! Please sign in with your credentials.</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <h1>Reset Password</h1>
          <p>Enter your email to reset your password</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send Reset Link</button>
          <p>
            Remembered your password?{" "}
            <span
              onClick={() => setIsResetLinkSent(true)}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Sign In
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
