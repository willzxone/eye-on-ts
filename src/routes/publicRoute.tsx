import { useEffect } from "react";
import { Outlet } from "react-router";
import { auth } from "@/firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";


const PublicRoute = () => {
  const navigate = useNavigate();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    });
  }, [navigate]);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="background"></div>
      <Outlet />
    </div>
  );
};

export default PublicRoute;
