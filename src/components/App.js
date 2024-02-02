import Login from './Login';
import Register from './Register';
import HomePage from './homePage/HomePage';
import Profile from './profile/Profile';
import BurgerMenu from './homePage/BurgerMenu';
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);
  const items = [{value: "Главная страница", href: "/"},{value: "Профиль", href: "/profile"}, {value: "О нас", href: "/about"}]

  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
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
