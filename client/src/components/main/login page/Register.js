/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useState } from 'react';
import { emailExists, isEmailValid, usernameExists } from './util';
import { handleServerDown } from '../utils/utils';

export default function Register({ setShowPageDictionary, setPageLoadDic, setUserToken, setUserType, apiService }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [emptyFieldError, setEmptyFieldError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setUsernameError("");
    setEmptyFieldError("");

    const errorMessages = [];

    // form validation 
    // empty username, email or password
    if (email=="" || username=="" || password == "") {
      errorMessages.push("Empty fields are not allowed");
    }
    else{
      // check if email is valid
      if (isEmailValid(email)) {
        // do nothing
      }
      else {
        errorMessages.push("Invalid Email");
      }

      try {
        // check if email or username exists
        const isEmailExists = await emailExists(email, apiService);
        if (isEmailExists) {
          errorMessages.push("Email Exists");
        }

        const isUsernameExists = await usernameExists(username, apiService);
        console.log(isUsernameExists);
        if (isUsernameExists) {
          errorMessages.push("Username Exists");
        }
      } catch (err) {
        console.error('Error in email/username api', err);
        handleMainPage();
        handleServerDown(setShowPageDictionary);
      }

      // password match
      if (password !== confirmPassword) {
        errorMessages.push("Passwords do not match");
      }

      // check if password contains username or email
      if (password.toLowerCase().includes(username.toLowerCase())) {
        errorMessages.push("Password cannot contain username");
      }

      if (password.toLowerCase().includes(email.toLowerCase())) {
        errorMessages.push("Password cannot contain email");
      }

    }
    
  

    // Set all error messages at once
    errorMessages.forEach((errorMessage) => {
      if (errorMessage.includes("Empty")) setEmptyFieldError(errorMessage);
      if (errorMessage.includes('Email')) setEmailError(errorMessage);
      if (errorMessage.includes('Password')) setPasswordError(errorMessage);
      if (errorMessage.includes('Username')) setUsernameError(errorMessage);
    });

    if (errorMessages.length > 0) {
      return;
    }

    try {
      // post to server
      const userData = { username: username, password: password, email: email }
      const response = await apiService.postNewUserSignup(userData);
      if (response && response.status !== 500) {
        // ---------------------------------------------------------------------------
        // DO NOT UNCOMMENT: Commented out the below lines as token needs to be updated on login and not on sign up 
        // set the token in local storage 
        //localStorage.setItem('jwt', response.data.token);

        // set the current user token
        //setUserToken(response.data.token);

        // saving token in api
        //apiService.createAxiosInstance(response.data.token);

        // set user type 
        //const updatedValuesUser = {
        //    guest:false, registered:true
        //}
        //setUserType(prevState => ({...prevState, ...updatedValuesUser}));
        // ---------------------------------------------------------------------------

        // redirect to loginpage
        //loginPage(setShowPageDictionary)
        const updatedValues = {
          signInPageButton: true,
          signUpPageButton: false,
          loginAsGuestButton: false,
          allButtons: false
        }
        setPageLoadDic(prevState => ({ ...prevState, ...updatedValues }));
      } else {
        // The response is not valid or the status is 500, handle the error
        console.error('User signup failed:', response && response.error);
      }
    } catch (err) {
      console.error('Error in signup ', err);
      handleServerDown(setShowPageDictionary);
      handleMainPage();
    }
  };

  const handleMainPage = () => {
    const updatedValues = {
      signInPageButton: false,
      signUpPageButton: false,
      loginAsGuestButton: false,
      allButtons: true
    }
    setPageLoadDic(prevState => ({ ...prevState, ...updatedValues }));
  }


  return (

    <>
      <div style={{ display: 'flex', }}>
        <div >
          <h2>Sign Up</h2>

          <form onSubmit={handleSignUp}>
            <label className='guiderText'>
              Username: &nbsp;
              <input
                id="signUpUsername"
                className='signUpBox'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>


            <br />
            <br />

            <label className='guiderText'>
              Email: &nbsp;
              <input
                id="signUpEmail"
                className='signUpBox'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            &nbsp;

            <br />
            <br />

            <label className='guiderText'>
              Password: &nbsp;
              <input
                id="signUpPassword"
                className='signUpBox'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <br />
            <br />

            <label className='guiderText'>
              Confirm Password: &nbsp;
              <input
                id="signUpConfirmPassword"
                className='signUpBox'
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            &nbsp;

            <br />
            <br />
            <span id="answer-text-error" className="error">{usernameError}</span>
            <br />
            <span id="answer-text-error" className="error">{emailError}</span>
            <br />
            <span id="answer-text-error" className="error">{passwordError}</span>
            <br />
            <span id="answer-text-error" className="error">{emptyFieldError}</span>

            <br />
            <br />
            <div className='button-row'>
              <button id="signUp" className='button' type="submit">Sign Up</button>
              <button className='button' style={{ marginLeft: '10px' }} onClick={handleMainPage}>Back to Home</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
