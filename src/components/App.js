import Login from './Login';
import Register from './Register';
import HomePage from './homePage/HomePage';
import Profile from './profile/Profile';
import BurgerMenu from './homePage/BurgerMenu';
import Products from './shopsProducts/Products';
import ProductPage from './shopsProducts/ProductPage';
import AddProductForm from './shopsProducts/AddProductForm';
import EditProductForm from './shopsProducts/EditProductForm';
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);
  const items = [{value: "Главная страница", href: "/", id: 1},{value: "Профиль", href: "/profile", id: 2}, {value: "О нас", href: "/about", id: 3}]
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
    const headers = JSON.parse(atob(token.split(".")[1]));
  
    if(Date.now() > new Date(headers.exp * 1000).getTime()) {
      localStorage.removeItem("token");
      localStorage.removeItem("shopOwner");
      window.location("/login")
    }
  }})

  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/add_product" element={<AddProductForm />} />
              <Route path="/edit_product/:id" element={<EditProductForm />} />
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
