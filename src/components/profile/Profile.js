import { useState, useEffect } from "react";
import axios from "../../api/axios";

const Profile = () => {
    const PROFILE_URL = '/profile';

    const[user, setUser] = useState({
        email : "",
        userName: "",
        phoneNumber: "",
        shopOwner: false
    });
    const[userName, setUserName] = useState("");
    const[email, setEmail] = useState("");
    const[phoneNumber, setPhoneNumber] = useState("");
    const[shopOwner, setShopOwner] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsq] = useState("");

    useEffect(() => {
        setUser({
            userName: userName,
            email: email,
            phoneNumber: phoneNumber,
            shopOwner: shopOwner
        })
    }, [userName, email, phoneNumber, shopOwner]);

    const handleSubmit = async (e) => {
        try {
            const response = await axios.patch(PROFILE_URL, {user},  
                {headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}});
            setUser({})
            setSuccess(true);
        } catch (err) {
            console.error(err)
            if(!err?.response) {
                setErrMsq('No Server Response')
            } else {
                setErrMsq('Error')
            }
        }
    }
    return(
        <>
            <h2>Ваш профиль</h2>
            <form className="profile_form" onSubmit={handleSubmit}>

                <label htmlFor="username">Username:</label>
                <input 
                    type="text"  
                    id="username"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                />

                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <label htmlFor="phoneNumber">Phone number: </label>
                <input 
                    type="text" 
                    id="phoneNumber" 
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                />

                <label htmlFor="owner">Является профилем магазина?</label>
                <input 
                    type="checkbox"
                    id="owner"
                    checked={shopOwner}
                    onChange={() => setShopOwner(!shopOwner)}
                />
                <button> Изменить профиль </button>
            </form>
        </>
    )
    }

export default Profile;