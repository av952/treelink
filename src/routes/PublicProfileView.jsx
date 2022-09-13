import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  existUserName,
  getProfilePhotoUrl,
  getUserProfileInfo,
} from "../firebase/firebase";
import style from "./css/publicProfile.module.css";
import styleLink from "./css/publicLink.module.css";

export const PublicProfileView = () => {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState("");
  const [state, setState] = useState(0);

  useEffect(() => {
    getProfile();
    async function getProfile() {
      const username = params.username;
      console.log(
        "🚀 ~ file: PublicProfileView.jsx ~ line 15 ~ getProfile ~ username",
        username
      );

      try {
        const userUid = await existUserName(username);
        console.log(
          "🚀 ~ file: PublicProfileView.jsx ~ line 19 ~ getProfile ~ userUid",
          userUid
        );

        if (userUid) {
          const userInfo = await getUserProfileInfo(userUid);
          console.log(
            "🚀 ~ file: PublicProfileView.jsx ~ line 22 ~ getProfile ~ userInfo",
            userInfo
          );
          setProfile(userInfo);

          const url = await getProfilePhotoUrl(
            userInfo.profileInfo.profilePicture
          );

          setUrl(url);
        } else {
          setState(7);
        }
      } catch (error) {}
    }
  }, [params]);

  if (state == 7) {
    return <h1>Username doesn't exist</h1>;
  }

  return (
    <div className={style.profileContainer}>
      <div className={style.profilePicture}>
        <img src={url}></img>
      </div>
      <h2>{profile != null ? profile.profileInfo.username : "loading..."}</h2>
      <h3>{profile?.profileInfo.displayName}</h3>
      <div className={styleLink.publicLinksContainer}>
        {profile?.linksInfo.map((el) => (
          <div className={styleLink.publicLinkContainer} key={el?.id}>
            <a href={el.url}>{el.title}</a>
          </div>
        ))}
      </div>
    </div>
  );
};
