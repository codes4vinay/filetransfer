
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCMUDz1OHvbHOtrGG6nfqoNqtwFK0xXLdg",
    authDomain: "filetranfer.firebaseapp.com",
    projectId: "filetranfer",
    storageBucket: "filetranfer.firebasestorage.app",
    messagingSenderId: "460156880356",
    appId: "1:460156880356:web:4c94225dec223990d3f3f1",
    measurementId: "G-MTTXYE9N3T"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
