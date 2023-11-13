import React from "react";
import '../../styles/AuthPage.scss';
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {useDispatch} from "react-redux";
import Lock from "./Lock";

interface User {
  username: string;
  password: string;
}

const usersList: User[] = [
    { username: 'sf_student1', password: '4i2385j' },
    { username: 'sf_student10', password: 'KHKfTXb' },
    { username: 'sf_student3', password: '6z9ZFRs' },
    { username: 'sf_student2', password: 'lV8xjCH' },
    { username: 'sf_student4', password: 'Br1+tbG' },
    { username: 'sf_student5', password: 'LuwAwJf' },
    { username: 'sf_student6', password: 'eczpWCB' },
    { username: 'sf_student7', password: 'P6VcKNf' },
    { username: 'sf_student8', password: '5QB0KM/' },
    { username: 'sf_student9', password: 'DTdEwAn' },

];

const inputStyles = {
    valid: {
        boxSizing: 'border-box',
        background: '#FFFFFF',
        border: '1px solid #C7C7C7',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.05)',
        borderRadius: '5px',

    },
    invalid: {
        border: '2px solid red',
        boxSizing: 'border-box',
        background: '#FFFFFF',
        boxShadow: '0px 0px 10px rgba(255, 69, 69, 0.59)',
        borderRadius: '5px',

    }
} as const;

const AuthComponent: React.FC = () => {

    const [login, setLogin] = useState('');
    const [loginValid, setLoginValid] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setSubmitDisabled(!(loginValid && passwordValid));
    }, [loginValid, passwordValid]);

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const user = usersList.find((u) => u.username === login && u.password === password);
        try {
            if (user) {
                setLoginValid(true);
                setPasswordValid(true);
                console.log('User found in local list,  now authenticating.');
            }
            const response = await axios.post(
                "https://gateway.scan-interfax.ru/api/v1/account/login",
                {login, password},
                {
                    headers: {
                        "Content-type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            const { accessToken, expire } = response.data;
            console.log('accessToken', accessToken)
            console.log('expire', expire)
            dispatch({ type: "LOGIN_SUCCESS", payload: { token: accessToken } });
            console.log("Authentication was successful.");
            navigate('/');
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
            } else {
                setError("Access token did not found");
            }
        setError("");
        } catch (err) {
            setError( "Incorrect login or password");
        }
    };


    return (
        <div className="auth-component">
            <div className="wrapper">
                <div className="pic-lock"></div>
                <div className="tabs">
                    <div className="tab">
                        <input type="radio" id="tab1" name="tab-group" checked/>
                            <label htmlFor="tab1" className="tab-title">Log In
                                <div className="auth-separator"></div>
                            </label>

                            <section className="tab-content">
                                <form className="auth-center-side">
                                    <div className="auth-input-title"> Username or phone number:</div>
                                    <input
                                        id="auth-input"
                                        style={error ? inputStyles.invalid : inputStyles.valid}
                                        type="text"
                                        value={login}
                                        onChange={(e) => {
                                            setLogin(e.target.value);
                                            setLoginValid(true);
                                        }}/>
                                    <div className="auth-input-title"> Password:</div>
                                    <input
                                         id="auth-input"
                                         style={error ? inputStyles.invalid : inputStyles.valid}
                                         type="password"
                                         value={password}
                                         onChange={(e) => {
                                            setPassword(e.target.value);
                                            setPasswordValid(true);
                                         }}
                                    />
                                    <button  type="submit" id="auth-text" className="auth-button" onClick={handleLogin} disabled={submitDisabled}> Log In </button>
                                     {error && <div className="error-message">{error}</div>}
                                    <div className="auth-restore-pass">
                                        <a href="#" id="text-auth">Forgot password?</a>
                                    </div>
                                    <div className="auth-lower-side">
                                        <p id="p">Log in via:</p>
                                        <div className="auth-logos">
                                            <div className="logo-1">
                                                <img src="/logo-1.png"/>
                                            </div>
                                            <div className="logo-2">
                                                <img src="/logo-2.png"/>
                                            </div>
                                            <div className="logo-3">
                                                <img src="/logo-3.png"/>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </section>
                    </div>
                    <div className="tab">
                        <input type="radio" id="tab2" name="tab-group"/>
                            <label htmlFor="tab2"  id="tab-2" className="tab-title">Sign up
                                <div className="auth-separator1"></div>
                            </label>
                            <section className="tab-content">There was no endpoint for registration in tech task</section>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default AuthComponent;