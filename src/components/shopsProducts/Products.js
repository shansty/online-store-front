import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Product from "./Product";
import getIDFromToken from "../../utils";
import { Link } from "react-router-dom"

const Products = () => {
    let id = getIDFromToken();
    const PRODUCTS_URL = `/users/${id}/products`;
    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    const[products, setProducts] = useState([]);
    const [errMsg, setErrMsq] = useState("");

    const handleAddProductButtonClick = () => {
        navigate("/add_product");
    };

    const getProducts = async () => {
        try {
            const response = await axios.get(PRODUCTS_URL,   
                {headers: {
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/json',
                    'Authorization':   `Bearer ${token}`}});
            const productsData = response?.data;
            setProducts(productsData || []);
            console.log({productsData})
        } catch (err) {
            if(!err?.response) {
                setErrMsq('No Server Response')
            } else {
                setErrMsq('Error')
            }
        }
    }

    useEffect(() => {
        getProducts()
    }, []);


      if (id === null) {
        return (
            <button className="profile_button" onClick={() => navigate("/login")}>
                Ошибка. Необходимо повторно авторизироваться.
            </button>
            )
        } else {
            return (
                <div>
                    <h2>Список товаров</h2>
                    {products.map(product => (
                    <div>
                        <Product key={product.id} product={product}/>
{/* ПРИ ПЕРЕХОДЕ ПО ССЫЛКЕ ОШИБКА Uncaught runtime errors:
×
ERROR
Cannot read properties of undefined (reading 'id')
TypeError: Cannot read properties of undefined (reading 'id') */}
                        <Link to={`/product/${product.id}`}>Подробная информация</Link>
                    </div>
                    ))}
                    <button className="profile_button" onClick={handleAddProductButtonClick}>Добавить товар</button>
                </div>
            )
        }
    }

export default Products;
