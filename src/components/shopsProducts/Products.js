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
            const productsData = response?.data.userProducts;
            setProducts(productsData || []);
        } catch (err) {
            console.log(err)
    }}

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
                        <Link to={`/product/${product.id}`}>Подробная информация</Link>
                    </div>
                    ))}
                    <button className="profile_button" onClick={handleAddProductButtonClick}>Добавить товар</button>
                </div>
            )
        }
    }

export default Products;
