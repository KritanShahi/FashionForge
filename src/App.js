import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './user/Home';
import AdminDashboard from './admin/AdminDashboard';
import Dashboard from './admin/Dashboard';
import CustomerManagement from './admin/CustomerManagement';
import OrderManagement from './admin/OrderManagement';
import ProductManagement from './admin/ProductManagement';
import MessageDashboard from './admin/MessageDashboard';
import ProductDetail from './user/ProductDetail';
import Cart from './component/Cart';
import EditProduct from './admin/EditProduct';
import AddProduct from './admin/AddProduct';
import ForgetPassword from './component/ForgetPassword';
import BuyNow from './component/BuyNow';
import Sidebar from './component/Sidebar';

export default function App() {
  const { currentUser, isFetching } = useSelector((state) => state.user);

  if (isFetching) {
    return <div>Loading...</div>; // Show this while fetching user data
  }

  console.log('Current User:', currentUser);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/cart" element={<Cart />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/buy" element={<BuyNow />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            currentUser?.isAdmin ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="customer" element={<CustomerManagement />} />
          <Route path="order" element={<OrderManagement />} />
          <Route path="product" element={<ProductManagement />} />
          <Route path="message" element={<MessageDashboard />} />
          <Route path="edit" element={<EditProduct />} />
          <Route path="add" element={<AddProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

