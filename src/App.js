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

export default function App() {
  const { currentUser, isFetching } = useSelector((state) => state.user);

  if (isFetching) {
    return <div>Loading...</div>; // Show this while fetching user data
  }

  console.log('Current User:', currentUser);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={
            currentUser ? (
              currentUser.isAdmin ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/cart" element={<Cart />} />
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

// import React from 'react';
// import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Login from './component/Login';
// import Signup from './component/Signup';
// import Home from './user/Home';
// import AdminDashboard from './admin/AdminDashboard';
// import Dashboard from './admin/Dashboard';
// import CustomerManagement from './admin/CustomerManagement';
// import OrderManagement from './admin/OrderManagement';
// import ProductManagement from './admin/ProductManagement';
// import MessageDashboard from './admin/MessageDashboard';
// import ProductDetail from './user/ProductDetail';
// import Cart from './component/Cart';
// import EditProduct from './admin/EditProduct'
// import AddProduct from './admin/AddProduct';



// export default function App() {
  
//   // const currentUser = useSelector((state) => state.user.currentUser);

  
//   const { currentUser, isFetching } = useSelector((state) => state.user);
//   if (isFetching) {
//     return <div>Loading...</div>; // Show this while fetching user data
//   }
//   console.log('Current User:', currentUser);
//   return (
//     <BrowserRouter>
//       <Routes>
      
//         {/* Redirect to either home or admin based on role
//         <Route path="/" element={user ? (user.role === 'admin' ? <Navigate to="./admin/AdminDashboard" /> : <Home />) : <Navigate to="/login" />} /> */}

//         {/* Public routes */}
//         <Route path="/signup" element={<Signup />} />
//         {/* <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} /> */}
//         <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
//         <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" />} />
//         <Route
//           path="/admin"
//           element={
//             currentUser?.isAdmin ? (
//               <AdminDashboard />
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />   
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/product/:id" element={<ProductDetail />} /> {/* Example product detail route */}

//         {/* Protected Admin Routes */}
//         <Route path="/admin" element={<AdminDashboard /> }>
//           <Route index element={<Dashboard />} /> {/* Default admin dashboard */}
//           <Route path="customer" element={<CustomerManagement />} />
//           <Route path="order" element={<OrderManagement />} />
//           <Route path="product" element={<ProductManagement />} />
//           <Route path="message" element={<MessageDashboard />} />
//           <Route path="edit" element={<EditProduct/>}/>
//           <Route path="add" element={<AddProduct/>}/>
//         </Route>
//       </Routes>
    
//     </BrowserRouter>
//   );
// }

