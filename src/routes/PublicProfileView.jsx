import { async } from "@firebase/util"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { existUserName, getProfilePhotoUrl, getUserProfileInfo } from "../firebase/firebase"

export const PublicProfileView = () => {
  const params = useParams()
  const [profile,setProfile]=useState(null)
  const [url,setUrl]=useState('')

  useEffect(()=>{
    getProfile()
    async function getProfile(){
      const username = params.username
      console.log("🚀 ~ file: PublicProfileView.jsx ~ line 15 ~ getProfile ~ username", username)
      
      try {
        const userUid = await existUserName(username)
        console.log("🚀 ~ file: PublicProfileView.jsx ~ line 19 ~ getProfile ~ userUid", userUid)

        if(userUid){
          const userInfo  = await getUserProfileInfo(userUid)
          console.log("🚀 ~ file: PublicProfileView.jsx ~ line 22 ~ getProfile ~ userInfo", userInfo)
          setProfile(userInfo)

          const url = await getProfilePhotoUrl( userInfo.profileInfo.profilePicture)

          setUrl(url)
        }

      } catch (error) {
        
      }
    }

  },[])

  return (
    <div>
      <div>
        <img src={url}></img>
      </div>
      <h2>{profile.profileInfo.username}</h2>
      <h3></h3>
      <div>

      </div>
    </div>
  )
}
