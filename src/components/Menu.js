import { Link } from "react-router-dom"

const Menu = ({items, active, setActive}) => {
    return(
        <>
            <div className={active ? "burger-menu active" : "burger-menu"} onClick={() => setActive(false)}>
                <div className="menu_content" onClick={e => e.stopPropagation()}>
                    <ul className="burger_links">
                        {items.map(item =>
                            <li>
                                <a href={item.href}>{item.value}</a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Menu;