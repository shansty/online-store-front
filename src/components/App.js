import Login from './Login';
import Register from './Register';
import HomePage from './homePage/HomePage';
import Profile from './profile/Profile';
import BurgerMenu from './homePage/BurgerMenu';
import Products from './shopsProducts/Products';
import Product from './shopsProducts/Product';
import AddProductForm from './shopsProducts/AddProductForm';
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);
  const items = [{value: "Главная страница", href: "/", id: 1},{value: "Профиль", href: "/profile", id: 2}, {value: "О нас", href: "/about", id: 3}]

  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/add_product" element={<AddProductForm />} />
        </Routes>
            <nav className="burger_navigation">
                <div className="burger-btn" onClick={() => setBurgerMenuActive(!burgerMenuActive)}>
                    <span/>
                </div>
            </nav>
            <BurgerMenu 
            active={burgerMenuActive}
            setActive={setBurgerMenuActive}
            items={items}
            />
      </BrowserRouter>
    </main>
  );
}

export default App;
