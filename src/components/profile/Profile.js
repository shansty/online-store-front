import { useState, useEffect } from "react";
import axios from "../../api/axios";
import getIDFromToken from "../../utils";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    let id = getIDFromToken();
    const PROFILE_URL = `/profile/${id}`;
    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    const[user, setUser] = useState({});
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
            const userData = response?.data?.user;
            setUser(userData)
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

    const handleSubmit = async () => {
        setAllowEdit(false);
        try {
            await axios.patch(PROFILE_URL, user,  
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

    useEffect(() => {
        getUser()
    }, []);

    useEffect(() => {
        setUser(user => ({
          ...user,
          phoneNumber: user.phoneNumber,
          shopOwner: user.shopOwner,
          userName: user.userName,
          email: user.email
        }));
      }, [user.shopOwner, user.email, user.userName, user.phoneNumber]);


      if (id === null) {
        return (
            <button className="profile_button" onClick={() => navigate("/login")}>
                Ошибка. Необходимо повторно авторизироваться.
            </button>
            )
        } else {
            return(
                <>
                    <h2>Ваш профиль</h2>
                    <form className="profile_form">
                        <div className="profile_form_field">
                            <label htmlFor="username">Username:</label>
                            <input 
                                type="text"  
                                id="username"
                                onChange={(e) => setUser({...user, userName: e.target.value })}
                                value={user.userName}
                                disabled= {!allowEdit}
                            />
                        </div>
                        <div className="profile_form_field">
                            <label htmlFor="email">Email:</label>
                            <input 
                                type="email" 
                                id="email" 
                                onChange={(e) => setUser({...user, email: e.target.value })}
                                value={user.email}
                                disabled= {!allowEdit}
                            />
                        </div>
                        <div className="profile_form_field">
                            <label htmlFor="phoneNumber">Phone number: </label>
                            <input 
                                type="text" 
                                id="phoneNumber" 
                                onChange={(e) => setUser({...user, phoneNumber: e.target.value })}
                                value={user.phoneNumber}
                                disabled= {!allowEdit}
                            />
                        </div>
                        <div className="profile_form_field">
                            <label htmlFor="owner">Является профилем магазина?</label>
                            <input 
                                type="checkbox"
                                id="owner"
                                checked={user.shopOwner}
                                onChange={(e) => setUser({...user, shopOwner: e.target.checked })}
                                disabled= {!allowEdit}
                            />
                        </div>
                        <div className="profile_form_field">
                            <button className="profile_button" onClick={handleEdit}> Изменить профиль </button>
                            <button className="profile_button" type="submit" onClick={handleSubmit}> Сохранить изменения профиля </button>
                        </div>
                    </form>
                </>
            )
        }
    }

export default Profile;
