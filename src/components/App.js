import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import { Route, BrowserRouter, Routes} from 'react-router-dom';

function App() {


  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
