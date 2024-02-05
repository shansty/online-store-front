import { useState, useEffect } from "react";
import axios from "../../api/axios";
import getIDFromToken from "../../utils";

const Profile = () => {
    let id = getIDFromToken();
    const PROFILE_URL = `/profile/${id}`;
    const token = localStorage.getItem("token");

    const[user, setUser] = useState({});
    const[userName, setUserName] = useState("Пока что");
    const[email, setEmail] = useState("Какие-то");
    const[phoneNumber, setPhoneNumber] = useState("Рандомные значения, ибо не работает");
    const[shopOwner, setShopOwner] = useState(false);
    const [allowEdit, setAllowEdit] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsq] = useState("");

    const getUser = async (e) => {
        try {
            const response = await axios.get(PROFILE_URL,   
                {headers: {
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/json',
                    'Authorization':   `Bearer ${token}`}});
            const userData = response?.data;
            setUser({userData})
            console.log({userData})
        } catch (err) {
            if(!err?.response) {
                setErrMsq('No Server Response')
            } else {
                setErrMsq('Error')
            }
        }
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setAllowEdit(true);
    };

    const handleSubmit = async (e) => {
        setAllowEdit(false);
        try {
            await axios.patch(PROFILE_URL, {user},  
                {headers: {
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/json',
                    'Authorization':   `Bearer ${token}`}});
            setSuccess(true);
        } catch (err) {
            if(!err?.response) {
                setErrMsq('No Server Response')
            } else {
                setErrMsq('Error')
            }
        }
    }

    useEffect((e) => {
        setUser({
            userName: userName,
            email: email,
            phoneNumber: phoneNumber,
            shopOwner: shopOwner
        })
    }, [userName, email, phoneNumber, shopOwner]);

    useEffect(() => {
        getUser()
    }, []);

    return(
        <>
            <h2>Ваш профиль</h2>
            <form className="profile_form">
                <div className="profile_form_field">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text"  
                        id="username"
                        onChange={(e) => setUserName(e.target.value)}
                        value={user.userName}
                        disabled= {!allowEdit}
                    />
                </div>
                <div className="profile_form_field">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={user.email}
                        disabled= {!allowEdit}
                    />
                </div>
                <div className="profile_form_field">
                    <label htmlFor="phoneNumber">Phone number: </label>
                    <input 
                        type="text" 
                        id="phoneNumber" 
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                        disabled= {!allowEdit}
                    />
                </div>
                <div className="profile_form_field">
                    <label htmlFor="owner">Является профилем магазина?</label>
                    <input 
                        type="checkbox"
                        id="owner"
                        checked={shopOwner}
                        onChange={() => setShopOwner(!shopOwner)}
                        disabled= {!allowEdit}
                    />
                </div>
                <div className="profile_form_field">
                    <button className="profile_button" onClick={handleEdit}> Изменить профиль </button>
                    <button className="profile_button" type="submit" onSubmit={handleSubmit}> Сохранить изменения профиля </button>
                </div>
            </form>
        </>
    )
    }

export default Profile;
