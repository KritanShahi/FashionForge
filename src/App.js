import {BrowserRouter,Route,Routes, Navigate} from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './user/Home';
import AdminDashboard from './admin/AdminDashboard';
import Dashboard from './admin/Dashboard'; // Import Dashboard component
import CustomerManagement from './admin/CustomerManagement';
import OrderManagement from './admin/OrderManagement';
import ProductManagement from './admin/ProductManagement'
import Cart from './component/Cart';
import { useSelector } from "react-redux";
import MessageDashboard from './admin/MessageDashboard';
import ProductDetail  from './user/ProductDetail'
import EditProduct from './admin/EditProduct';
export default function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        {/* Signup Route */}
        <Route path='/signup' element={user ? <Navigate to="/" /> : <Signup />} />

        {/* Login Route */}
        <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />

        {/* Home Route */}
        <Route path='/' element={<Home />} />

        {/* Cart Route */}
        <Route path='/cart' element={<Cart />} />

        {/* Product Detail Route */}
        <Route path='/product/:id' element={<ProductDetail />} />

        {/* Admin Dashboard Route (Restricted Access) */}
        <Route 
          path='/admin' 
          element={ <AdminDashboard /> } > 
          
          {/* Admin Dashboard Subroutes */}
          <Route index element={<Dashboard />} />
          <Route path="customer" element={<CustomerManagement />} />
          <Route path="order" element={<OrderManagement />} />
          <Route path="product" element={<ProductManagement />} />
          <Route path="message" element={<MessageDashboard />} />
          <Route path="edit" element={<EditProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


/*import {BrowserRouter,Route,Routes, Navigate} from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './user/Home';
import AdminDashboard from './admin/AdminDashboard';
import Dashboard from './admin/Dashboard'; // Import Dashboard component
import CustomerManagement from './admin/CustomerManagement';
import OrderManagement from './admin/OrderManagement';
import ProductManagement from './admin/ProductManagement'
import Cart from './component/Cart';
import { useSelector } from "react-redux";
import MessageDashboard from './admin/MessageDashboard';
import ProductDetail  from './user/ProductDetail'
import EditProduct from './admin/EditProduct';

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
 {/* Nest the routes under AdminDashboard 
 <Route path="/admin" element={<AdminDashboard /> }>
          <Route index element={<Dashboard />} /> {/* Default dashboard route 
          <Route path="customer" element={<CustomerManagement />} />
          <Route path="order" element={<OrderManagement />} />
          <Route path="product" element={<ProductManagement />} />
          <Route path="message" element={<MessageDashboard/>}/>
          <Route path="edit" element={<EditProduct />} />
        </Route>

</Routes>
</BrowserRouter>

);

}
*/