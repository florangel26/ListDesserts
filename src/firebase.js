
import { initializeApp } from "firebase/app";
import {getAuth,  onAuthStateChanged} from 'firebase/auth';
import{ getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC8M9YNkUhEtrw3sx0vzDwantEWN62sGUI",
  authDomain: "mayo-2022homerwork-list.firebaseapp.com",
  projectId: "mayo-2022homerwork-list",
  storageBucket: "mayo-2022homerwork-list.appspot.com",
  messagingSenderId: "431791816006",
  appId: "1:431791816006:web:5b4b57c62df68828ce7947"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



const currentUserPromise = () =>
    new Promise((resolve, reject) => {
        onAuthStateChanged(
            auth,
            (user) => {
                resolve(user);
            },
            (e) => reject(e)
        );
    });

export { auth, currentUserPromise, db};