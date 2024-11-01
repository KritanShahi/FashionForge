import {BrowserRouter,Route,Routes, Navigate} from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './user/Home';
import AdminDashboard from './component/AdminDashboard';
import Dashboard from './component/Dashboard'; // Import Dashboard component
import CustomerManagement from './component/CustomerManagement';
import OrderManagement from './component/OrderManagement';
import ProductManagement from './component/ProductManagement'
import Cart from './component/Cart';
import { useSelector } from "react-redux";
import MessageDashboard from './component/MessageDashboard';
import ProductDetail  from './user/ProductDetail'


export default function App(){
  const user = useSelector((state) => state.user.currentUser);

return(

<BrowserRouter>
<Routes>


<Route path='/signup'  element={user ? <Navigate to="/" /> : <Signup/> }></Route>
<Route path='/login'  element={user ? <Navigate to="/" /> : <Login /> }></Route>
<Route path='/' element={<Home></Home>}></Route>
<Route path="/cart" element={<Cart/>}></Route>
<Route path="/product/:id" element={<ProductDetail />} />
 {/* Nest the routes under AdminDashboard */}
 <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Dashboard />} /> {/* Default dashboard route */}
          <Route path="customer" element={<CustomerManagement />} />
          <Route path="order" element={<OrderManagement />} />
          <Route path="product" element={<ProductManagement />} />
          <Route path="message" element={<MessageDashboard/>}/>
        </Route>

</Routes>
</BrowserRouter>

);

}

//{user?.isAdmin ? <AdminDashboard /> : <Navigate to="/admin" />}





/*
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';
import AdminDashboard from './component/AdminDashboard';
import Dashboard from './component/Dashboard'; // Import Dashboard component
import CustomerManagement from './component/CustomerManagement';
import OrderManagement from './component/OrderManagement';
import ProductManagement from './component/ProductManagement';
import MessageDashboard from './component/MessageDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />

        {/* Nest the routes under AdminDashboard *//*
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Dashboard />} /> {/* Default dashboard route 
          <Route path="customer" element={<CustomerManagement />} />
          <Route path="order" element={<OrderManagement />} />
          <Route path="product" element={<ProductManagement />} />
          <Route path="message" element={<MessageDashboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}*/