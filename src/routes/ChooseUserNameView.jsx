import React, { useState } from "react";
import AuthProvider from "../components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { existUserName, updateUser } from "../firebase/firebase";
import style from './css/chooseusername.module.css'


export const ChooseUserNameView = () => {
  const navigate = useNavigate()
  const [state, setState] = useState(0);
  const [currentuser, setcurrentUser] = useState({});
  const [username,setUserName]= useState('')

  function handleUserLoggedIn(user){
    navigate('treelink/dashboard')
  }

  function handleUserisnotRegistered(user){
    setState(3)
    setcurrentUser(user)
  }
  function handleUsernotLogIn(){
    navigate('treelink/login')
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
        console.log('creando nombre de usuario');
        const temp ={...currentuser}
        temp.username = username
        temp.processCompleted = true
        await updateUser(temp)
        setState(6)

      }
    }
  }

  if(state== 3 || state == 5){
    return(
      <div className={style.chooseusernamecontainer}>
          <h1>Bienvenido {currentuser.displayName}</h1>
          <p>Para terminar el proceso por favor elige un nombre de usuario</p>

          <div>
            <input className='input' autoFocus type="text" onChange={handleInputUserName}/>
          </div>

          <div>
            <button className="btn" onClick={hanldeContinue}>Continue</button>
          </div>
      </div>
    )
  }

  if(state == 6){
    return <div className={style.chooseusernamecontainer}>
      <h1>Felicidades, ya puedes ir al dashboard a crear tus links</h1>
      <Link to='treelink/dashboard'>Continuar</Link>
    </div>
  }

  return (
    <AuthProvider
      onUserloggedIn={handleUserLoggedIn}
      onUserisnotRegistered={handleUserisnotRegistered}
      onUsernotLogIn={handleUsernotLogIn}
    ></AuthProvider>
  );
};
