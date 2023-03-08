import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { signInWithPopup } from 'firebase/auth';

const auth = firebase.auth();
const firestore = firebase.firestore();

firebase.initializeApp({
  apiKey: "AIzaSyD263T0TMibafDtq-pkj60epFGCJY5omRs",
  authDomain: "et-chat-demo.firebaseapp.com",
  projectId: "et-chat-demo",
  storageBucket: "et-chat-demo.appspot.com",
  messagingSenderId: "689986829959",
  appId: "1:689986829959:web:66afbfedd388f43807c222"
})

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>


      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithEmail = () => {
    const provider = new firebase.auth.EmailAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithEmail}>Sign in with email</button>
  )
}

function SignOut() {
  return auth.currentUser && (

    <button onClick={() => auth.signOut()}>Sign out</button>
  )
}

function ChatRoom() {

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/> )}
      </div>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message;
  return <p>{text}</p>
}

export default App;
