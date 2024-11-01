import {BrowserRouter,Route,Routes, Navigate} from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './user/Home';
import AdminDashboard from './component/AdminDashboard';
import CustomerManagement from './component/CustomerManagement';
import OrderManagement from './component/OrderManagement';
import ProductManagement from './component/ProductManagement'
import ProductDetail from './user/ProductDetail';
import Cart from './component/Cart';
import { useSelector } from "react-redux";

export default function App(){
  const user = useSelector((state) => state.user.currentUser);

return(

<BrowserRouter>
<Routes>


<Route path='/signup' element={<Signup></Signup>}></Route>
<Route path='/login'  element={user ? <Navigate to="/" /> : <Login /> }></Route>
<Route path='/' element={<Home></Home>}></Route>
<Route path='/admin/*' element={<AdminDashboard></AdminDashboard>}></Route>
<Route path='/customer' element={<CustomerManagement></CustomerManagement>}></Route>
<Route path='/order' element={<OrderManagement></OrderManagement>}></Route>
<Route path='/product' element={<ProductManagement></ProductManagement>}></Route>
<Route path="/product/:id" element={<ProductDetail />} />
<Route path="/cart" element={<Cart/>}></Route>

</Routes>
</BrowserRouter>

);

}