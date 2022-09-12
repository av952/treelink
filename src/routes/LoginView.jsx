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

export const LoginView = () => {
  /*
  0:inicializado
  1:loading
  2:login Completo
  3:login pero sin registro
  4:no hay nadie logueado
  
  */

  const navigate = useNavigate()

  //const [currentUser, setCurrentUser] = useState(null);
  const [state, setCurrentState] = useState(0);

  // useEffect(()=>{
  //   setCurrentState(1)
  //   onAuthStateChanged(auth,handleUserStateChange)
  // },[])

  // async function handleUserStateChange(user){
  //   if(user){
  //     const isRegister = await userExists(user.uid)
  //     if(isRegister){
  //       //redirigir a dashboard
  //       navigate('/dashboard')
  //       setCurrentState(2)
  //     }else{
  //       //redirigir a chooseUsername
  //       navigate('/choose-username')
  //       setCurrentState(3)
  //     }

  //   }else{
  //     setCurrentState(4)
  //     console.log('No está autenticado...');
  //   }
  // }

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
    navigate('/dasboard')
  }

  function handleUsernotRegistered(user){
    navigate('/choose-username')
  }
  function handleUsernotLogIn(){
    setCurrentState(4)
  }

  if(state==4){
  return (
    <div>
      <button onClick={handleClick}>Login with google</button>
    </div>
  )
  }

  return (
    <AuthProvider
      onUserloggedIn={handleUserLoggedIn}
      onUsernotRegistered={handleUsernotRegistered}
      onUsernotLogIn={handleUsernotLogIn}>
        <div>Loading...</div>
    </AuthProvider>
  );

};
