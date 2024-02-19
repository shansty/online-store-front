import { useState } from "react";
import axios from "../../api/axios";
import getIDFromToken from "../../utils";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {

    let userId = getIDFromToken();
    const token = localStorage.getItem("token");

    const ADD_PRODUCT_URL = `/users/${userId}/products`
    const navigate = useNavigate();
    const[product, setProduct] = useState({});

    const handleSubmit = async (e) => {
        e.preventdefault();
        try {
            const formData = new FormData();
            formData.append('title', product.title);
            formData.append('description', product.description);
            formData.append('vendorCode', product.vendorCode);
            formData.append('img', product.img);
            await axios.post(ADD_PRODUCT_URL, formData,  
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*', 
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });
                navigate("/products");    
        } catch (err) {
            console.log(err.response)
        }
    }

            return(
                <>
                    <h2>Добавление товара</h2>
                    <form className="profile_form">
                        <div className="profile_form_field">
                            <label htmlFor="title">Название:</label>
                            <input 
                                type="text"  
                                id="title"
                                onChange={(e) => setProduct({...product, title: e.target.value })}
                                value={product.title}
                            />
                        </div>
                        <div className="profile_form_field">
                            <label htmlFor="description">Описание:</label>
                            <input 
                                type="text" 
                                id="description" 
                                onChange={(e) => setProduct({...product, description: e.target.value })}
                                value={product.description}
                            />
                        </div>
                        <div className="profile_form_field">
                            <label htmlFor="vendorCode">Артикул: </label>
                            <input 
                                type="text" 
                                id="vendorCode" 
                                onChange={(e) => setProduct({...product, vendorCode: e.target.value })}
                                value={product.vendorCode}
                            />
                        </div>
                        <div className="profile_form_field">
                            <label htmlFor="img">Добавить изображение товара</label>
                            <input 
                                type="file"
                                id="img"
                                checked={product.img}
                                onChange={(e) => {
                                    const files = e.target.files;
                                    let selectedFiles = [];
                                    
                                    for (let i = 0; i < files.length; i++) {
                                        selectedFiles.push(files[i]);
                                    }
                                    
                                    setProduct({...product, img: selectedFiles});
                                }}
                            />
                        </div>
                        <div className="profile_form_field">
                            <button className="profile_button" onClick={handleSubmit}> Сохранить товар </button>
                        </div>
                    </form>
                </>
            )
    }

export default AddProductForm;
