import { useState, useEffect } from "react";
import axios from "../../api/axios";
import getIDFromToken from "../../utils";

const Product = (product) => {
    let id = getIDFromToken();
    //как определить второе айди (которое продукта)
    const PRODUCT_URL = `/users/${id}/products/${id}`;
    const token = localStorage.getItem("token");


    return (
        <div>
          <h2>{product.title}</h2>
          <p>Артикул: {product.vendorCode}</p>
          <p>Описание: {product.description}</p>
          <p>Наличие: {product.isInStock}</p>
          <p>Фото: {product.img}</p>
        </div>
      );
    };


export default Product;
