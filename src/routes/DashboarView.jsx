import React, { useState } from "react";
import AuthProvider from "../components/AuthProvider";
import {useNavigate } from "react-router-dom";
import { DashboardWraper } from "../components/DashboardWraper";
import {v4 as uuidv4} from 'uuid'
import { getLinks, inserNewLink } from "../firebase/firebase";

export const DashboarView = () => {
  const navigate = useNavigate()
  const [currentuser, setcurrentUser] = useState({});
  const [state,setState] = useState(0)
  const [title,setTitle] = useState('')
  const [url,setUrl] = useState('')
  const [links,setlinks] = useState([])


 async function handleUserLoggedIn(user) {
      setcurrentUser(user)
      setState(2)
      const resLinks = await getLinks(user.uid)
      setlinks([...resLinks])
  }

  function handleUserisnotRegistered(user) {
    navigate('/login')
  }
  function handleUsernotLogIn() {
    navigate("/login");
  }

  if(state==0){
    return (
      <AuthProvider
        onUserloggedIn={handleUserLoggedIn}
        onUserisnotRegistered={handleUserisnotRegistered}
        onUsernotLogIn={handleUsernotLogIn}
      >Loading..</AuthProvider>
    );
  }

  function handleOnSubmit(e){
    e.preventDefault()
    addLink()
  }

  function addLink(){
    if(title != '' && url != ''){
      const newLink ={
        id: uuidv4(),
        title: title,
        url: url,
        uid: currentuser.uid
      }

      const res = inserNewLink(newLink)
      newLink.docId = res.id
      setTitle('')
      setUrl('')
      setlinks([...links,newLink])
    }
  }

  function  handleOnChange(e){
    const value = e.target.value
    const name = e.target.name

    if(name == 'title'){
      setTitle(value)
      return
    }
    setUrl(value)

  }

  return (
    <DashboardWraper>
      <div>
      <h1>Dashboard</h1>

      <form action="" onSubmit={handleOnSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" onChange={handleOnChange} />

        <label htmlFor="url">Url</label>
        <input type="text" name="url" onChange={handleOnChange}/>

        <input type="submit" value="Create new Link" />
      </form>

      <div>
        {
          links.map(el=>{
            return(
              <div key={el.uid}>
                <a href={el.url}>{el.title}</a>
              </div>
            )
          })
        }
      </div>

      </div>

    </DashboardWraper>
  )


};
