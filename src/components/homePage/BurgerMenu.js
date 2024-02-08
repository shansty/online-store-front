import { Link } from "react-router-dom"
import { useEffect, useState } from "react"; 

const BurgerMenu = ({items, active, setActive}) => {

    const [shopOwner, setShopOwner] = useState(false);

    useEffect(() => {
        const shopOwnerValue = localStorage.getItem("shopOwner");
        const isShopOwner = Boolean(shopOwnerValue);
        setShopOwner(isShopOwner);
      }, []);

    return(
        <>
            <div className={active ? "burger-menu active" : "burger-menu"} onClick={() => setActive(false)}>
                <div className="menu_content" onClick={e => e.stopPropagation()}>
                    <ul className="burger_links">
                        {items.map(item =>
                            <li key={item.id}>
                                  <Link to={item.href}>{item.value}</Link>
                            </li>   
                        )}
                        {shopOwner && (
                            <li className="burger_links">
                                <Link to="/product">Магазин</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default BurgerMenu;