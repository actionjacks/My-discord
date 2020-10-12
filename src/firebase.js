import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAIpMhde1GLOlmk13VhjAjIWDngb06sMJA",
  authDomain: "my-discord-6e1f1.firebaseapp.com",
  databaseURL: "https://my-discord-6e1f1.firebaseio.com",
  projectId: "my-discord-6e1f1",
  storageBucket: "my-discord-6e1f1.appspot.com",
  messagingSenderId: "206809456821",
  appId: "1:206809456821:web:97bbeecee41b11177c1efc",
  measurementId: "G-GGDPHZQ47L",
};
//initial firebase using config
const firebaseApp = firebase.initializeApp(firebaseConfig);
//get access to database
const db = firebaseApp.firestore();
//get access to authentication
const auth = firebase.auth();
//get access to google authentication
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
