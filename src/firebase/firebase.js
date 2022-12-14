// obtner las configuraciones ded la cuenta
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage,ref,uploadBytes,getDownloadURL,getBytes} from 'firebase/storage'
import {getFirestore,collection,addDoc,doc,getDoc,query,where,setDoc,deleteDoc, getDocs} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY ,
  authDomain: import.meta.env.VITE_AUTH,
  projectId: import.meta.env.VITE_PROJECID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSSENDERID,
  appId: import.meta.env.VITE_APPID
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
const db  = getFirestore(app)
const storage = getStorage(app)

export async function userExists(uid){
  const docRes = doc(db,'users',uid)
  const res = await getDoc(docRes)

  console.log(22,res.exists());

  return res.exists()
}

export async function existUserName(username){
  const users =[]
  const docsRef = collection(db,'users')
  const q  = query(docsRef,where('username','==',username))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach(el=>{
    return users.push(el.data())
  })
  return users.length > 0 ? users[0].uid : null


}

export async function registerNewUser(user){
  try {
    const collectionRef = collection(db,'users')
    const docRef = doc(collectionRef,user.uid)
    await setDoc(docRef,user)

  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(user){
  
  try {
    const collectionRef = collection(db,'users')
    const docRef = doc(collectionRef,user.uid)
    await setDoc(docRef,user)

  } catch (error) {
    console.error('up',error)
  }
}


export async function getUserInfo(uid){
  try {
    const docRef = doc(db,'users',uid)
    const document = await getDoc(docRef)
   
    return document.data()
  } catch (error) {
    console.error(error)
  }
}

export async function inserNewLink(link){
  try {
    const docRef = collection(db,'links')
    const res = await addDoc(docRef,link)
    return res
  } catch (error) {
    console.log(insert,error);
  }
}

export async function getLinks(uid){
  const links =[]
  try {
    const collectionRef = collection(db,'links')
    const q  = query(collectionRef,where('uid','==',uid))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach(el=>{
      const link = {...el.data()}
      link.docId = el.id
      links.push(link)
    })

    return links

  } catch (error) {
    console.log(error);
  }
}

export async function updateLink(docId,link){
  try {
    const docRef = doc(db,'links',docId)
    const res = await setDoc(docRef,link)
    return res
  } catch (error) {
    console.error(error)
  }
}

export async function deleteLink(docId){
  try {
    const docRef = doc(db,'links',docId)
    const res = await deleteDoc(docRef)

    return res
  } catch (error) {
    console.error(error)
  }
}

export async function setUserProfilePhoto(uid,file){

  try {
    const imageRef = ref(storage,`images/${uid}`)
    const resUpload = await uploadBytes(imageRef,file)
    return resUpload
  } catch (error) {
    console.error('upload file',error)
  }
}

/**
 * Obtener la url para poder cargar el documento
 */

export async function getProfilePhotoUrl(profilepicture){
  try {
    const imageRef = ref(storage,profilepicture)
    const url = await getDownloadURL(imageRef)
    return url
  } catch (error) {
      console.error(error)
  }
}

export async function getUserProfileInfo(uid){

  try {
    const profileInfo  = await getUserInfo(uid)
    const linksInfo  = await getLinks(uid)
    return {
      profileInfo:profileInfo,
      linksInfo: linksInfo
    }
  } catch (error) {
    console.error('getuserprofileinfo',error)
  }


}


/**
 * LOg out
 */

export async function logOut(){
  await auth.signOut()
}