// obtner las configuraciones ded la cuenta
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage,ref,uploadBytes,getDownloadURL,getBytes} from 'firebase/storage'
import {getFirestore,collection,addDoc,doc,getDoc,query,where,setDoc,deleteDoc} from 'firebase/firestore'
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