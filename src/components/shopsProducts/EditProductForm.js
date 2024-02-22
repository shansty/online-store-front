import { useState, useEffect } from "react";
import axios from "../../api/axios";
import getIDFromToken from "../../utils";
import { useNavigate, useParams } from "react-router-dom";

const EditProductForm = () => {

    const userId = getIDFromToken();
    const token = localStorage.getItem("token");
    let { id } = useParams();
    const EDIT_PRODUCT_URL = `/users/${userId}/products/${id}`

    const navigate = useNavigate();
    const[product, setProduct] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(EDIT_PRODUCT_URL, product,  
                {headers: {
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/json',
                    'Authorization':   `Bearer ${token}`}});
          } catch (err) {
              console.log(err)
          }
          navigate("/products")
    }

    useEffect(() => {
        setProduct(product => ({
          ...product,
          title: product.title,
          description: product.description,
          vendorCode: product.vendorCode,
          img: product.img
        }));
      }, [product]);

            return(
                <>
                    <h2>Добавление товара</h2>
                    <form className="profile_form" onSubmit={handleSubmit}>
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
                                type="text"
                                id="img"
                                value={product.img}
                                onChange={(e) => {
                                    setProduct({...product, img: e.target.value})
                                }}
                            />
                        </div>
                        <div className="profile_form_field">
                            <button className="profile_button"> Сохранить изменения </button>
                        </div>
                    </form>
                </>
            )
    }

export default EditProductForm;
