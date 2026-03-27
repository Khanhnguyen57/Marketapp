import { BrowserRouter, Routes, Route } from "react-router-dom";


import HomePage from './pages/home';
import ShopPage from './pages/shop';
import CartPage from './pages/cart';
import LoginPage from './pages/login';
import DetailPage from './pages/detail';
import RegisterPage from './pages/register'
import CheckoutPage from "./pages/checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<CheckoutPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;