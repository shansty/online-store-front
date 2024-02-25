import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import getIDFromToken from '../../utils';
import axios from "../../api/axios";

const ProductPage = () => {
  let { id } = useParams();
  const userId = getIDFromToken();
  const token = localStorage.getItem("token");
  const PRODUCT_URL = `/users/${userId}/products/${id}`;

  const navigate = useNavigate();
  const[product, setProduct] = useState({});

  const getProduct = async () => {
    try {
        const response = await axios.get(PRODUCT_URL,   
            {headers: {
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'application/json',
                'Authorization':   `Bearer ${token}`}});
        const productsData = response?.data.userProduct;
        setProduct(productsData);
    } catch (err) {
        console.log(err)
}}

  useEffect(() => {
    getProduct();
  }, [])

  const handleEditProductButton = () => {
    navigate(`/edit_product/${id}`);
  }

  const handleDeleteProductButton = async () => {
    try {
      const response = await axios.delete(PRODUCT_URL,   
          {headers: {
              'Access-Control-Allow-Origin': '*', 
              'Content-Type': 'application/json',
              'Authorization':   `Bearer ${token}`}});
      console.log("Product is deleted")
      navigate("/products");
  } catch (err) {
      console.log(err)
}}

    return (
      <div>
        <div>
          <h2>{product.title}</h2>
          <p>Артикул: {product.vendorCode}</p>
          <p>Описание: {product.description}</p>
          <p>Фото: {product.img}</p>
        </div>
        <button className="profile_button" onClick={handleEditProductButton}>Изменить товар</button>
        <button className="profile_button" onClick={handleDeleteProductButton}>Удалить товар</button>
      </div>
    );
  };


export default ProductPage;
