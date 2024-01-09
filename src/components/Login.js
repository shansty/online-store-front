import React, { useState } from 'react';

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (el) => {
        el.preventDefault();
        console.log(email) 
    }

    return(
        <div className="auth-form">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email"> Email </label>
                <input value={email} onChange={(el) => setEmail(el.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
                <label htmlFor="password"> Password </label>
                <input value={password} onChange={(el) => setPassword(el.target.value)} type="password" placeholder="yourpassword" id="password" name="password"/>
                <button type="submit"> Login </button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch("register")}>Don't have an account? Register here.</button>
        </div>
    )
}
export default Login;