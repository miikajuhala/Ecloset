import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDMHVe-oqMInGxUV5yjwTulCm-JDA6yo8s",
    authDomain: "sizefinder-7d214.firebaseapp.com",
    databaseURL: "https://sizefinder-7d214-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sizefinder-7d214",
    storageBucket: "gs://sizefinder-7d214.appspot.com",
    messagingSenderId: "723503817866",
    appId: "1:723503817866:web:cfcb5d63c987f36a253973"
  };
  
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

module.exports = { db, app, storage }