import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';
import AdminDashboard from './component/AdminDashboard';
import CustomerManagement from './component/CustomerManagement';
import OrderManagement from './component/OrderManagement';
import ProductManagement from './component/ProductManagement'

export default function App(){


return(

<BrowserRouter>
<Routes>

<Route path='/' element={<Login></Login>}></Route>
<Route path='/signup' element={<Signup></Signup>}></Route>
<Route path='/home' element={<Home></Home>}></Route>
<Route path='/admin/*' element={<AdminDashboard></AdminDashboard>}></Route>
<Route path='/customer' element={<CustomerManagement></CustomerManagement>}></Route>
<Route path='/order' element={<OrderManagement></OrderManagement>}></Route>
<Route path='/product' element={<ProductManagement></ProductManagement>}></Route>
</Routes>
</BrowserRouter>

);

}