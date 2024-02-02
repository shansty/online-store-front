import { Link } from "react-router-dom"

const BurgerMenu = ({items, active, setActive}) => {
    return(
        <>
            <div className={active ? "burger-menu active" : "burger-menu"} onClick={() => setActive(false)}>
                <div className="menu_content" onClick={e => e.stopPropagation()}>
                    <ul className="burger_links">
                        {items.map(item =>
                            <li>
                                  {/* <a href={item.href}>{item.value}</a> */}
                                  <Link to={item.href}>{item.value}</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default BurgerMenu;