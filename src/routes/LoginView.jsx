import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, userExists } from "../firebase/firebase";
//con nagigate es posible redireccionar a una página
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";

import style from './css/loginview.module.css'

export const LoginView = () => {
  const navigate = useNavigate()
  const [state, setCurrentState] = useState(0);
  /*
  0:inicializado
  1:loading
  2:login Completo
  3:login pero sin registro
  4:no hay nadie logueado
  5: ya existe el user name
  6: Nuevo user name click para continuar
  7: username no existe
  */

  async function handleClick() {
    const googleProvider = new GoogleAuthProvider();
    await singWithGoogle(googleProvider);
    /** */
    async function singWithGoogle(googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res.user.emailVerified);
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleUserLoggedIn(user){
      navigate('/treelink/dashboard')
  }

  function handleUserisnotRegistered(user){
    navigate('/treelink/choose-username')
  }
  function handleUsernotLogIn(){
    setCurrentState(4)
  }

  if(state==4){
  return (
    <div className={style.loginView}>
      <div>
        <h1>Treelink</h1>
      </div>
      <button className={style.provider} onClick={handleClick}>Login with google</button>
    </div>
  )
  }

  return (
    <AuthProvider
      onUserloggedIn={handleUserLoggedIn}
      onUserisnotRegistered={handleUserisnotRegistered}
      onUsernotLogIn={handleUsernotLogIn}>
        <div>Loading...</div>
    </AuthProvider>
  );

};
