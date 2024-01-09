import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function Auth() {
    const [currentForm, setCurrentForm] = useState("login");
    const toggleCurrentForm = (formName) => {
        setCurrentForm (formName);
    }

    return (
        <div className="Auth">
            {
              currentForm === "login" ?  <Login onFormSwitch={toggleCurrentForm} /> : <Register onFormSwitch={toggleCurrentForm} />
            }
        </div>
    );
}

export default Auth;