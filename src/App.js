import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

const auth = getAuth(app)
function App() {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState({});

  const githubProvider = new GithubAuthProvider();


  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, googleProvider)
    .then( result => {
      const user = result.user;
      setUser(user);
    })
    .catch(err => console.error(err))
  }

  const handleSignOut = () =>{
    signOut(auth)
    .then(() =>{
      setUser({})
    })
    .catch(err => console.log(err))
  }

  const handleGithubSignIn = () =>{
    signInWithPopup( auth, githubProvider)
    .then (res => {
      const user = res.user;
      setUser(user)
    })
    .catch(err => console.error(err))
  }
  return (
    <div className="App">
      {
        user.uid ?
        <button onClick={handleSignOut}>Sign Out</button> :
        <>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGithubSignIn}>Github Sign In</button>
        </>
      }
      <h2>Name: {user.displayName}</h2>
      <h3>Email: {user.email}</h3>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
