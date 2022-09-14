import React, { useState } from "react";
import AuthProvider from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { DashboardWraper } from "../components/DashboardWraper";
import { v4 as uuidv4 } from "uuid";
import { deleteLink, getLinks, inserNewLink, updateLink } from "../firebase/firebase";
import { Linkcomp } from "../components/Linkcomp";
import style from './css/dashboar.module.css'
import styleLink from './css/link.module.css'

export const DashboarView = () => {
  const navigate = useNavigate();
  const [currentuser, setcurrentUser] = useState({});
  const [state, setState] = useState(0);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setlinks] = useState([]);

  async function handleUserLoggedIn(user) {
    setcurrentUser(user);
    setState(2);
    const resLinks = await getLinks(user.uid);
    setlinks([...resLinks]);
  }
  console.log("🚀 ~ file: DashboarView.jsx ~ line 25 ~ handleUserLoggedIn ~ links", links)
  

  function handleUserisnotRegistered(user) {
<<<<<<< HEAD
    navigate("/treelink/login");
  }
  function handleUsernotLogIn() {
    navigate("/treelink/login");
=======
    navigate("treelink/login");
  }
  function handleUsernotLogIn() {
    navigate("treelink/login");
>>>>>>> 4a73bfe38c3752277c19d936e003bd4658f2928f
  }

  if (state == 0) {
    return (
      <AuthProvider
        onUserloggedIn={handleUserLoggedIn}
        onUserisnotRegistered={handleUserisnotRegistered}
        onUsernotLogIn={handleUsernotLogIn}
      >
        Loading..
      </AuthProvider>
    );
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    addLink();
  }

  async function addLink() {
    if (title != "" && url != "") {
      const newLink = {
        id: uuidv4(),
        title: title,
        url: url,
        uid: currentuser.uid,
      };

      const res = await inserNewLink(newLink);
      newLink.docId = res.id;
      setlinks([...links, newLink]);
      setTitle("");
      setUrl("");

    }
  }

  function handleOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    if (name == "title") {
      setTitle(value);
      return;
    }
    setUrl(value);
  }

  async function handleDeleteLink(docId){
      await deleteLink(docId)

      const tmp = links.filter(el=>el.docId != docId)

      setlinks([...tmp])
  }

  async function handleUpdateLink(docId,title,url){
    const link  = links.find(el=> el.docId == docId)
    link.title = title
    link.ur = url

    await updateLink(docId,link)
  }

  return (
    <DashboardWraper currentuser={currentuser.username}>
      <div>
        <h1>Dashboard</h1>

        <form className={style.entryContainer} action="" onSubmit={handleOnSubmit}>
          <label htmlFor="title">Title</label>
          <input className="input" type="text" name="title" value={title || ''} onChange={handleOnChange} />

          <label htmlFor="url">Url</label>
          <input className="input" type="text" name="url" value={url || ''} onChange={handleOnChange} />

          <input className="btn" type="submit" value="Create new Link" />
        </form>

        <div className={styleLink.linksContainer}>
          {links.map((el) => {
            console.log(1,el.docId);
            return (
              <Linkcomp
                key={el.docId}
                docId={el.docId}
                url={el.url}
                title={el.title}
                onDelete={handleDeleteLink}
                onuPdate={handleUpdateLink}
              />
            );
          })}
        </div>
      </div>
    </DashboardWraper>
  );
};
