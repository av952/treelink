import React, { useState } from "react";
import AuthProvider from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { existUserName, updateUser } from "../firebase/firebase";


export const ChooseUserNameView = () => {
  const navigate = useNavigate()
  const [state, setState] = useState(0);
  const [currentuser, setcurrentUser] = useState({});
  const [username,setUserName]= useState('')

  function handleUserLoggedIn(user){
    navigate('/dashboard')
  }

  function handleUserisnotRegistered(user){
    console.log('handle user not registered');
    setState(3)
    setcurrentUser(user)
  }
  function handleUsernotLogIn(){
    navigate('/login')
  }

  function handleInputUserName(e){
    setUserName(e.target.value)
  }

  /**Oprimir el boton de continue */
  async function hanldeContinue(){
    if(username != ''){
      const exist = await existUserName(username)

      if(exist){
        setState(5)
      }else{
        const temp ={...currentuser}
        temp.username = username
        temp.processCompleted = true
        await updateUser(temp)

      }
    }
  }

  if(state== 3){
    return(
      <div>
          <h1>Bienvenido {currentuser.displayName}</h1>
          <p>Para terminar el proceso por facor elige un nombre de usuario</p>

          <div>
            <input type="text" onChange={handleInputUserName}/>
          </div>

          <div>
            <button onClick={hanldeContinue}>Continue</button>
          </div>
      </div>
    )
  }

  return (
    <AuthProvider
      onUserloggedIn={handleUserLoggedIn}
      onUserisnotRegistered={handleUserisnotRegistered}
      onUsernotLogIn={handleUsernotLogIn}
    ></AuthProvider>
  );
};
