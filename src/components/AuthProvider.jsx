import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, userExists } from "../firebase/firebase";
//con nagigate es posible redireccionar a una página
import { useNavigate } from "react-router-dom";
export default function AuthProvider({
  children,
  onUserloggedIn,
  onUsernotLogIn,
  onUsernotRegistered,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, handleUserStateChange);
  }, [navigate, onUserloggedIn, onUsernotLogIn, onUsernotRegistered]);
  async function handleUserStateChange(user) {
    if (user) {
      const isRegister = await userExists(user.uid);
      if (isRegister) {
        //redirigir a dashboard
        onUserloggedIn(user);
      } else {
        //redirigir a chooseUsername
        onUsernotRegistered(user);
      }
    } else {
      onUsernotLogIn();
    }
  }

  return <div>{children}</div>;
}
