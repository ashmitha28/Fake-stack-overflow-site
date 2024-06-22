/* eslint-disable react/prop-types */
import React from 'react';
import { useState } from 'react';
import Login from './login';
import Register from './Register';
import { homePage } from '../utils/stateUpdateHelpers';
import "./index.css";
import { handleServerDown } from '../utils/utils';

export default function LoginPageComp({ setShowPageDictionary, setUserToken, setUserType, apiService, getData }) {
  const [pageLoadDic, setPageLoadDic] = useState({
    signInPageButton: false,
    signUpPageButton: false,
    loginAsGuestButton: false,
    allButtons: true
  });

  const handleLoginPage = () => {
    // set state variable
    const updatedValues = {
      signInPageButton: true,
      signUpPageButton: false,
      loginAsGuestButton: false,
      allButtons: false
    }
    setPageLoadDic(prevState => ({ ...prevState, ...updatedValues }));

  }

  const handleSignUpPage = () => {
    // set state variable
    const updatedValues = {
      signInPageButton: false,
      signUpPageButton: true,
      loginAsGuestButton: false,
      allButtons: false
    }
    setPageLoadDic(prevState => ({ ...prevState, ...updatedValues }));
  }

  const handleLoginAsGuest = async () => {
    // get and store guest data
    const getUserToken = async () => {
      await apiService.postGuestLogIn()
        .then((res) => {
          setUserToken(res.data.token);

          // set the token in local storage 
          localStorage.setItem('jwt', res.data.token);

          // saving token in api
          apiService.createAxiosInstance(res.data.token);
        });
    };

    try {
      await getUserToken();

      // set state variable
      const updatedValues = {
        signInPageButton: false,
        signUpPageButton: false,
        loginAsGuestButton: true,
        allButtons: false
      }
      setPageLoadDic(prevState => ({ ...prevState, ...updatedValues }));

      const updatedValuesUser = {
        guest: true, registered: false
      }
      setUserType(prevState => ({ ...prevState, ...updatedValuesUser }));

      // render homepage
      await homePage(setShowPageDictionary);

    } catch (err) {
      console.error('Error in guest login', err);
      handleServerDown(setShowPageDictionary);
    }
    // ---------------------------------

  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        {pageLoadDic.signInPageButton &&
          <div style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '8px', width: '350px', margin: '0 auto' }}>
            <Login setShowPageDictionary={setShowPageDictionary} setPageLoadDic={setPageLoadDic} setUserToken={setUserToken} setUserType={setUserType} apiService={apiService} getData={getData} />
          </div>}

        {pageLoadDic.signUpPageButton &&
          <div style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '8px', width: '350px', margin: '0 auto' }}>
            <Register setShowPageDictionary={setShowPageDictionary} setPageLoadDic={setPageLoadDic} setUserToken={setUserToken} setUserType={setUserType} apiService={apiService} />
          </div>}

        {pageLoadDic.allButtons &&
          <>
          
            <h3 className='welcome-font'>Fake Stack Overflow</h3>
      <div className="button-box">
        <div className="button-row">
          <div className="button-column">
            <h3 className="guiderText">If you already have an account</h3>
            <button className='button login-button' onClick={handleLoginPage}>Log In</button>
          </div>
          <div className="button-column">
            <h3 className="guiderText">New User?</h3>
            <button className='button signup-button' onClick={handleSignUpPage}>Register</button>
          </div>
          <div className="button-column">
            <h3 className="guiderText">I would like to</h3>
            <button className='button guest-button' onClick={handleLoginAsGuest}>Continue as Guest</button>
          </div>
        </div>
      </div>
      
    </>
        }
      </div>
    </>
  );
}

