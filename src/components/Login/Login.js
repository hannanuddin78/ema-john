import React, { useContext, useState } from 'react';
import {UserContext} from "../../App";
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleSignInBtn, handleSignOutBtn, initializeLoginFrameWorker, signInWithEmailAndPassword } from './LoginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name : '',
    email : '',
    password : '',
    photo : ''
  })

  initializeLoginFrameWorker();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignInBtn = () => {
    handleSignInBtn()
    .then(res => {
      handleState(res, true);
    })
  }

  const SignOutBtn = () => {
    handleSignOutBtn()
    .then(res => {
      handleState(res, false);
    })
  }

  const handleState = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  }

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);             //see user email and password
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length >= 6;
      const passwordNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordNumber;
    }
    if (isFieldValid) {
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    console.log(user.email, user.password);
      if (newUser && user.email && user.password) {
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleState(res, true);
        })
      };

      if (!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleState(res, true);
        })
      }
      e.preventDefault();
  }

  return (
    <div style={{textAlign: 'center'}}>
      {user.isSignedIn ? <button onClick={SignOutBtn}>Sign Out</button> : <button onClick={googleSignInBtn}>Sign in</button>}
      <br/>
      <button>Log in using Facebook</button>
      {
        user.isSignedIn === true && <div>
          <p>Welcome to {user.name}</p>
          <p>Your Email : {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }  
      <h1>Our Own Authentication</h1>
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id=""/>
      <label htmlFor="newUser">new user sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleChange} placeholder="type your name"/>}
        <br/>
        <input type="email" name="email" onBlur={handleChange} placeholder="type your email" required/>
        <br/>
        <input type="password" name="password" onBlur={handleChange} placeholder="type your password" required/>
        <br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      <p style={{color:'red'}}>{user.error}</p>
      {user.success && <p style={{color:'green'}}>user was successfully {newUser ? 'created' : 'logg in'}</p>}
    </div>
  );
}

export default Login;
