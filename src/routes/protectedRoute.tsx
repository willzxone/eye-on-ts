import { Outlet } from "react-router";
import { auth } from "@/firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/home");
      }
    });
  }, [navigate]);
  return (
    <div className="h-full">
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
