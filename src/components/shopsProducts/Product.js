import getIDFromToken from "../../utils";

const Product = ({product}) => {
  
    let id = getIDFromToken();
    const PRODUCT_URL = `/users/${id}/products/${product.id}`;
    const token = localStorage.getItem("token");

    return (
        <div>
          <h2>{product.title}</h2>
          <p>Артикул: {product.vendorCode}</p>
          <p>Описание: {product.description}</p>
          <p>Фото: {product.img}</p>
        </div>
      );
    };


export default Product;
