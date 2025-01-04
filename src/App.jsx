import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/shared/AppLayout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import NotFound from "./pages/NotFound";
import Services from "./pages/services/Services";

import "./App.css";
import SignUp from "./pages/auth/SignUp";
import LogIn from "./pages/auth/LogIn";
import ProductsAll from "./pages/products/ProductsAll";
import ProductsSingle from "./pages/products/ProductsSingle";
import CartProvider from "./contexts/CartContext";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} />
          <Route path="products" element={<ProductsAll />} />
          <Route path="products/:id" element={<ProductsSingle />} />
          <Route path="products/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
