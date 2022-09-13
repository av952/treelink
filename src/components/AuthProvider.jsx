import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, getUserInfo, registerNewUser, userExists } from "../firebase/firebase";
//con nagigate es posible redireccionar a una página
import { useNavigate } from "react-router-dom";


/** INICIO */
export default function AuthProvider({
  children,
  onUserloggedIn,
  onUsernotLogIn,
  onUserisnotRegistered
}) {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, handleUserStateChange);
  }, [navigate, onUserloggedIn, onUsernotLogIn, onUserisnotRegistered]);

  /**
   * 
   */
  async function handleUserStateChange(user) {
    if (user) {
      const isRegister = await userExists(user.uid);
      if (isRegister) {
        const userInfo = await getUserInfo(user.uid)
        if(userInfo.processCompleted){
          console.log('registrado');
          onUserloggedIn(user);
        }else{
          onUserisnotRegistered(user);

        }
        //redirigir a dashboard
      } else {
        console.log('NO registrado');
        await registerNewUser({
          uid: user.uid,
          displayName: user.displayName,
          profilePicture: '',
          username: '',
          processCompleted: false
        })
        
        
        console.log('NO reg 2');
        onUserisnotRegistered(user);
        //redirigir a chooseUsername
      }
    } else {
      onUsernotLogIn();
    }
  }

  return <div>{children}</div>;
}
