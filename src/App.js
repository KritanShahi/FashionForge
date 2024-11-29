
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
import ForgetPassword from './component/ForgetPassword';
import BuyNow from './component/BuyNow';
import OrderDetails from './admin/OrderDetails';
import WaitingOrder from './user/WaitingOrder';

export default function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to either home or admin based on role */}

        <Route path="/" element={<Home/>}/>

        {/* Public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<ForgetPassword />} />
    
        <Route path="/orderdetails" element={<WaitingOrder />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} /> {/* Example product detail route */}

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminDashboard /> }>
          <Route index element={<Dashboard />} /> {/* Default admin dashboard */}
          <Route path="customer" element={<CustomerManagement />} />
          <Route path="order" element={<OrderManagement />} />
          <Route path="product" element={<ProductManagement />} />
          <Route path="message" element={<MessageDashboard />} />
          <Route path="edit" element={<EditProduct/>}/>
          <Route path="add" element={<EditProduct/>}/>
          <Route path="order/:id" element={<OrderDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


/*  <Route path="/" element={user ? (user.role === 'admin' ? <Navigate to="./admin/AdminDashboard" /> : <Home />) : <Navigate to="/login" />} />*/

