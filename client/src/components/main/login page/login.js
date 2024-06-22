/* eslint-disable react/prop-types */
import React from 'react';
import { useState } from 'react';
import { homePage } from '../utils/stateUpdateHelpers';
import { handleServerDown } from '../utils/utils';

export default function Login({ setShowPageDictionary, setPageLoadDic, setUserType, setUserToken, apiService, getData }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('')
    const [loginError, setLoginError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault();
        setUsernameError("");
        setPasswordError("");
        setLoginError("");

        // --------------------------------------------------------
        // form validation and error report
        const errorMessages = [];

        if (password.length < 1) {
            errorMessages.push("Password Cannot be Empty");
        }

        // Set all error messages at once
        errorMessages.forEach((errorMessage) => {
            if (errorMessage.includes('Invalid')) setUsernameError(errorMessage);
            if (errorMessage.includes('Password')) setPasswordError(errorMessage);
        });

        if (errorMessages.length > 0) {
            return;
        }

        // --------------------------------------------------------

        try {
            // get user token
            const userData = { password: password, username: username }
            const response = await apiService.postUserLogIn(userData);

            if (response && (response.status === 200)) {
                // set the token in local storage 
                localStorage.setItem('jwt', response.data.token);

                // set user token
                setUserToken(response.data.token);

                // saving token in api
                apiService.createAxiosInstance(response.data.token);

                // set user type 
                const updatedValuesUser = {
                    guest: false, registered: true
                }
                setUserType(prevState => ({ ...prevState, ...updatedValuesUser }));

                getData();

                // if authenticated, show homepage
                homePage(setShowPageDictionary);
            }
            else {
                // set state variable to sign in page
                const updatedValues = {
                    signInPageButton: true,
                    signUpPageButton: false,
                    loginAsGuestButton: false,
                    allButtons: false
                }
                setPageLoadDic(prevState => ({ ...prevState, ...updatedValues }));

                // The response is not valid or the status is 500, handle the error
                setLoginError(response.data.message);
            }
        } catch (err) {
            console.error('Error in user login', err);
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
            <h2>Login Page</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '10px' }}>
                    <label className='guiderText'>
                        Username: &nbsp;
                        <input
                            id="loginUsername"
                            type="text"
                            className='signUpBox'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    &nbsp;
                    <span id="answer-text-error" className="error">{usernameError}</span>
                </div>

                <br />

                <div style={{ marginBottom: '10px' }}>
                    <label className='guiderText'>
                        Password: &nbsp;
                        <input
                            id="loginPassword"
                            className='signUpBox'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    &nbsp;
                    <span id="answer-text-error" className="error">{passwordError}</span>
                </div>

                <br />
                <div className='button-row'>
                    <button id="loginButton" className='button' type="submit">Login</button>
                    <button id="backHomeButton" className='button' style={{ marginLeft: '10px' }} onClick={handleMainPage}>Go to Home</button>
                </div>
            </form>

            <br />
            <span id="answer-text-error" className="error">{loginError}</span>

        </>
    );
}
