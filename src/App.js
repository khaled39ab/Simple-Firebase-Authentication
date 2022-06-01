import './App.css';
import app from './firebase.init';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

const auth = getAuth(app)
function App() {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState({});

  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, provider)
    .then( result => {
      const user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch(err => console.log(err))
  }

  const handleSignOut = () =>{
    signOut(auth)
    .then(() =>{
      setUser({})
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      <button onClick={handleSignOut}>Sign Out</button>
      <h2>Name: {user.displayName}</h2>
      <h3>Email: {user.email}</h3>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
