import React, { useState } from 'react';

const Register = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (el) => {
        el.preventDefault();
        console.log(email) 
    }

    return(
        <div className="auth-form">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full name</label>
                <input value={name} onChange={(el) => setName(el.target.value)} id="name" placeholder="Full name" name="name" />
                <label htmlFor="email"> Email </label>
                <input value={email} onChange={(el) => setEmail(el.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
                <label htmlFor="password"> Password </label>
                <input value={password} onChange={(el) => setPassword(el.target.value)} type="password" placeholder="yourpassword" id="password" name="password"/>
                <button type="submit"> Login </button>
            </form>
        <button className="link-btn"onClick={() => props.onFormSwitch("login")}>Already have an account? Login here.</button>
    </div>
    )
}
export default Register;