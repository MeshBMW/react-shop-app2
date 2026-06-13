import '../styles/pages/orders/orders.css'
import { Header } from "../components/Header.tsx";
import {OrdersGrid} from "../components/OrdersGrid.jsx";
import { useState, useEffect } from "react";
import axios from "axios";


export function OrdersPage({ cartItems = [], loadCart, theme = 'light', toggleTheme = () => {} }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersPageData = async () => {
      const response = await axios.get('/api/orders?expand=products')
      setOrders(response.data);
    }
    fetchOrdersPageData();
  }, [])

  return (
    <>

      <link rel="apple-touch-icon" sizes="180x180" href="/faviconO/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/faviconO/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/faviconO/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>

      <title>Orders Page</title>

      <Header cart={cartItems} theme={theme} toggleTheme={toggleTheme}/>

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} loadCart={loadCart} />

      </div>
      </>
  )
}
