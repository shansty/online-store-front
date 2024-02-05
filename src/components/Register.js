import React, { useState, useRef, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';
import { Link } from "react-router-dom"

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-z]{2,6}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register'

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(
            !USER_REGEX.test(user) || 
            !EMAIL_REGEX.test(email) || 
            !PWD_REGEX.test(pwd)
        ) {
            setErrMsg("Invallid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                { userName: user, email, password: pwd }
            );
            console.log(response.data);
            console.log(JSON.stringify(response))
            setSuccess(true);
        } catch (err) {
            if(!err?.response) {
                setErrMsg('No Server Response');
            } else if(err.response?.status === 409) {
                setErrMsg('This email already register, please Sign In');
            } else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    }

    return(
        <>
        {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    <a href="/">Sign In</a>
                </p>
            </section>
        ) : (
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="username">
                        Username:
                        <span className={validName ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validName || !user ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input 
                        type="text"  
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)} 
                        value={user}
                        required 
                        aria-invalid={validName ? "false" : "true"} 
                        aria-describedby="uidnote" 
                        placeholder="Username" 
                        onFocus={() => setUserFocus(true)} 
                        onBlur={() => setUserFocus(false)} 
                    />
                    <p  id="uidnote" 
                        className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Must begin with a letter. <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>


                    <label htmlFor="email">
                        Email:
                        <span className={validEmail ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validEmail || !email ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        aria-invalid={validEmail ? "false" : "true"} 
                        aria-describedby="emailnote" 
                        id="email" 
                        autoComplete="off" 
                        placeholder="Example@gmail.com" 
                        onFocus={() => setEmailFocus(true)} 
                        onBlur={() => setEmailFocus(false)} 
                    />
                    <p  id="emailnote" 
                        className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must contain @. <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>


                    <label htmlFor="password">
                        Password:
                        <span className={validPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validPwd || !pwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input type="password" 
                        onChange={(e) => setPwd(e.target.value)} 
                        value={pwd}
                        required 
                        aria-invalid={validPwd ? "false" : "true"} 
                        aria-describedby="pwdnote" 
                        id="password" 
                        placeholder="Password" 
                        onFocus={() => setPwdFocus(true)} 
                        onBlur={() => setPwdFocus(false)} />
                    <p  id="pwdnote" 
                        className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character. <br />
                        Allow special characters: 
                        <span aria-label="exclamation mark">!</span>
                        <span aria-label="at symbol">@</span>
                        <span aria-label="hashtag">#</span>
                        <span aria-label="dollar sign">$</span>
                        <span aria-label="percent">%</span>
                    </p>


                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <span className={validMatch && matchPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input type="password" 
                        onChange={(e) => setMatchPwd(e.target.value)} 
                        required 
                        value={matchPwd}
                        aria-invalid={validMatch ? "false" : "true"} 
                        aria-describedby="confirmnote" 
                        id="confirm_pwd" 
                        placeholder="Confirm password" 
                        onFocus={() => setMatchFocus(true)} 
                        onBlur={() => setMatchFocus(false)} />
                    <p  id="confirmnote" 
                        className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>

                    <button className="auth_button" type="submit" disabled={!validEmail || !validName || !validPwd || !validMatch}> Sign Up </button>
                </form>
            <p>Already registered? <br />
                    <Link to="/login">
                        Sign In
                    </Link>
            </p>
        </section>
        )}
    </>
    )
}
export default Register;