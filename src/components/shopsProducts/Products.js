import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Product from "./Product";
import getIDFromToken from "../../utils";

const Products = () => {
    let id = getIDFromToken();
    const PRODUCTS_URL = `/users/${id}/products`;
    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    const[products, setProducts] = useState([]);
    const [errMsg, setErrMsq] = useState("");

    const getProducts = async (e) => {
        try {
            const response = await axios.get(PRODUCTS_URL,   
                {headers: {
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/json',
                    'Authorization':   `Bearer ${token}`}});
            const productsData = response?.data;
            setProducts(productsData || []);
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

    // useEffect(() => {
    //     setProducts(products => ({
    //       ...products,
    //       title: products.title,
    //       description: products.description,
    //       img: products.img,
    //       isInStock: products.isInStock,
    //       vendorCode: products.vendorCode
    //     }));
    //   }, [products]);


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
                    <Product key={product.id} product={product} />
                    ))}
                </div>
            )
        }
    }

export default Products;
