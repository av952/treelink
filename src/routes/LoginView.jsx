import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { useEffect, useState } from 'react'
import {auth} from '../firebase/firebase'

export const LoginView = () => {

  const [currentUser,setCurrentUser]= useState(null)
  const [state,setCurrentState] = useState(0)

  
  useEffect(()=>{
    onAuthStateChanged(auth,handleUserStateChange)
  },[])

  function handleUserStateChange(user){
    if(user){
      console.log(user.displayName);

    }else{
      console.log('No está autenticado...');
    }
  }

  async function handleClick(){

    const googleProvider = new GoogleAuthProvider()
    await singWithGoogle(googleProvider)
    /** */
    async function singWithGoogle(googleProvider){
      try {
        const res = await signInWithPopup(auth,googleProvider)
        console.log(res.user.emailVerified);
      } catch (error) {
        console.error(error)
      }
    }
  }


  return (
    <div>
      <button onClick={handleClick}>Login with google</button>
    </div>
  )
}
