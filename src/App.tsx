import './index.css'
import {useEffect, useState} from "react";
import api from './api';
import { Routes, Route } from 'react-router'
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage.jsx";
import { NF404 } from "./pages/error/404.jsx";
// import { Analytics } from "@vercel/analytics/react"
// import { SpeedInsights } from "@vercel/speed-insights/react"

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';


  const savedTheme = window.localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const loadCart = async () => {
    const response = await api.get('api/cart-items?expand=product')
    setCartItems(response.data);
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme])

  useEffect(() => {
    loadCart();
  }, [])

  return (
    <>
      <Routes>
        <Route index element={<HomePage cartItems={cartItems} loadCart={loadCart} theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="checkout" element={<CheckoutPage cartItems={cartItems} loadCart={loadCart} theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="orders" element={<OrdersPage cartItems={cartItems} loadCart={loadCart} theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="tracking" element={<TrackingPage cartItems={cartItems} theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="*" element={<NF404 />} />
      </Routes>
    </>
  )
}

export default App
