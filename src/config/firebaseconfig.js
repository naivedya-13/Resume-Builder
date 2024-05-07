import {getApp , getApps,initializeApp} from "firebase/app";
import {getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"






// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY ,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN ,
//     projectId: process.env.REACT_APP_PROJECT_ID ,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET ,
//     messagingSenderId :process.env.REACT_APP_MESSAGING_SENDER_ID ,
//     appId: process.env.REACT_APP_APPID,
//   };






const firebaseConfig = {
  apiKey: "AIzaSyB-mm5LX0ujuK7UzMWfDLZ96P3hRGhCGuw",
  authDomain: "expressume-61b8a.firebaseapp.com",
  projectId: "expressume-61b8a",
  storageBucket: "expressume-61b8a.appspot.com",
  messagingSenderId: "348275949801",
  appId: "1:348275949801:web:399f95b1ff6a3eef8d3078"
};






  const app = getApps.length> 0 ? getApp():initializeApp(firebaseConfig);


  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);


  export{auth,db , storage};


