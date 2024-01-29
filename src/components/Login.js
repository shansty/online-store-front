import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import { Link } from "react-router-dom"


const LOGIN_URL = '/login';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsq] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsq("");
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, {email:email, password:pwd},  
                {headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}});

            console.log(JSON.stringify(response?.data));
           // const accessToken = response?.data?.accessToken;
           // setAuth({ user, pwd, accessToken });
            setEmail('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            console.error(err)
            if(!err?.response) {
                setErrMsq('No Server Response')
            } else if(err.response?.status === 400) {
                setErrMsq('Missing Username or Password')
            } else if(err.response?.status === 401) {
                setErrMsq('Unauthorized')
            } else {
                setErrMsq('Login Faild')
            }
            errRef.current.focus();
        }
    }

    return(
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="/">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offcreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email"> Email:</label>
                        <input 
                            type="text" 
                            id="email" 
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            requred
                        />

                        <label htmlFor="password"> Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            requred
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account? <br />
                        <Link to="/register">
                            Sign Up
                        </Link>
                    </p>
                </section>
             )}
        </>
    )
}

export default Login;