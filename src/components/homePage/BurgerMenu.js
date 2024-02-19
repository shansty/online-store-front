import { Link } from "react-router-dom"
import { useEffect, useState } from "react"; 

const BurgerMenu = ({items, active, setActive}) => {
    

    const [shopOwner, setShopOwner] = useState(localStorage.getItem("shopOwner")==="true");

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
                        {shopOwner && 
                            <li className="burger_links">
                                <Link to="/products">Магазин </Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default BurgerMenu;