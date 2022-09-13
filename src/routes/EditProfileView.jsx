import { DashboardWraper } from "../components/DashboardWraper";
import AuthProvider from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { async } from "@firebase/util";
import { getProfilePhotoUrl, setUserProfilePhoto, updateUser } from "../firebase/firebase";

export const EditProfileView = () => {
  const [currentuser, setcurrentUser] = useState({});
  const [state, setState] = useState(0);
  const [profileUrl,setprofileUrl] = useState(null)
  const navigate = useNavigate();
  const fileref = useRef()

  function handleUserLoggedIn(user){
    setcurrentUser(user)
    setState(2)

}

function handleUserisnotRegistered(user){
  navigate('/login')
}
function handleUsernotLogIn(){
  navigate('/login')
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
          tempUser.profilepicture = res.metadata.fullPath
          await updateUser(tempUser)
          setcurrentUser({...tempUser})

          const url = await getProfilePhotoUrl(currentuser.profilepicture)
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
          <div>
            <div>
              <img src={profileUrl} alt=""  width={100}/>
            </div>
            <div>
              <button onClick={hanldeOpenFilePicker}>Choose picture</button>
              <input ref={fileref} type="file"style={{display:'none'}} onChange={handleChangeFile} />
            </div>
          </div>
        </div>
      </DashboardWraper>
  );
};
