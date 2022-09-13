import AuthProvider from "../components/AuthProvider";
import {  useNavigate } from "react-router-dom";
import { logOut } from "../firebase/firebase";


export const SingOutView = () => {
  const navigate = useNavigate()


  async function handleUserLoggedIn(user){
    await logOut()
  }

  function handleUserisnotRegistered(user){
    navigate('/login')
  }
  function handleUsernotLogIn(){
    navigate('/login')
  }

  function handleInputUserName(e){
    setUserName(e.target.value)
  }
  return (
    <AuthProvider
      onUserloggedIn={handleUserLoggedIn}
      onUsernotLogIn={handleUsernotLogIn}
      onUserisnotRegistered={handleUserisnotRegistered}
    ></AuthProvider>
  );
}
