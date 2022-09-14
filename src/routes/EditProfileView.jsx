import { DashboardWraper } from "../components/DashboardWraper";
import AuthProvider from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { async } from "@firebase/util";
import { getProfilePhotoUrl, setUserProfilePhoto, updateUser } from "../firebase/firebase";

import style from './css/profileview.module.css'

export const EditProfileView = () => {
  const [currentuser, setcurrentUser] = useState({});
  const [state, setState] = useState(0);
  const [profileUrl,setprofileUrl] = useState(null)
  const navigate = useNavigate();
  const fileref = useRef()

  async function handleUserLoggedIn(user){
    setcurrentUser(user)
    setState(2)
    const url = await getProfilePhotoUrl(user.profilePicture)
    setprofileUrl(url)

}

function handleUserisnotRegistered(user){
  navigate('treelink/login')
}
function handleUsernotLogIn(){
  navigate('treelink/login')
}

function hanldeOpenFilePicker(){
  if(fileref.current){
    fileref.current.click()
  }
}

function handleChangeFile(e){
  const files = e.target.files
  const fileReader = new FileReader() //para acceder a la info de un archivo

  //consultamos si el usuario tiene algún archivo seleccionado
  if(fileReader && files &&  files.length > 0){
      fileReader.readAsArrayBuffer( files[0])
      fileReader.onload = async function(){
        const imageData  = fileReader.result
        const res = await setUserProfilePhoto(currentuser.uid,imageData)
        if(res){
          const tempUser = {...currentuser}
          tempUser.profilePicture = res.metadata.fullPath
          await updateUser(tempUser)
          setcurrentUser({...tempUser})

          const url = await getProfilePhotoUrl(currentuser.profilePicture)
          setprofileUrl(url)
        }
      }
  }
}

if(state != 2){
  return(
    <AuthProvider
    onUserloggedIn={handleUserLoggedIn}
    onUserisnotRegistered={handleUserisnotRegistered}
    onUsernotLogIn={handleUsernotLogIn}
  >
    </AuthProvider>
  )
}

  return (
      <DashboardWraper>
        <div>
          <h2>Edit profile info</h2>
          <div className={style.profileContainer}>
            <div className={style.profilePicture}>
              <img src={profileUrl} alt=""  width={100}/>
            </div>
            <div>
              <button className="btn" onClick={hanldeOpenFilePicker}>Choose picture</button>
              <input className={style.fileInput} ref={fileref} type="file" onChange={handleChangeFile} />
            </div>
          </div>
        </div>
      </DashboardWraper>
  );
};
