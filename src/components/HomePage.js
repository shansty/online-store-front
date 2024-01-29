import { Link } from "react-router-dom"
import Menu from "./Menu";
import { useState } from "react";

const HomePage = () => {
    const [burgerMenuActive, setBurgerMenuActive] = useState(false);
    const items = [{value: "Профиль", href: "/profile"}, {value: "О нас", href: "/about"}]
    return(
        <>
            <h1>Some HomePage</h1>
            <Link to="/register">
                Register
            </Link>
            <Link to="/login">
                Login
            </Link>
            <nav>
                <div className="burger-btn" onClick={() => setBurgerMenuActive(!burgerMenuActive)}>
                    <span/>
                </div>
            </nav>
            <Menu 
            active={burgerMenuActive}
            setActive={setBurgerMenuActive}
            items={items}
            />
        </>
    )
}

export default HomePage;