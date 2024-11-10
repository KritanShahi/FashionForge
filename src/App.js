
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './user/Home';
import AdminDashboard from './component/AdminDashboard';
import Dashboard from './component/Dashboard';
import CustomerManagement from './admin/CustomerManagement';
import OrderManagement from './admin/OrderManagement';
import ProductManagement from './admin/ProductManagement';
import MessageDashboard from './admin/MessageDashboard';
import ProductDetail from './user/ProductDetail';
import Cart from './component/Cart';

export default function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to either home or admin based on role */}
        <Route path="/" element={user ? (user.role === 'admin' ? <Navigate to="./admin/AdminDashboard" /> : <Home />) : <Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} /> {/* Example product detail route */}

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminDashboard /> }>
          <Route index element={<Dashboard />} /> {/* Default admin dashboard */}
          <Route path="customer" element={<CustomerManagement />} />
          <Route path="order" element={<OrderManagement />} />
          <Route path="product" element={<ProductManagement />} />
          <Route path="message" element={<MessageDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

