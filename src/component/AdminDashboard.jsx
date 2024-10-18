import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';

const AdminDashboard = () => (
  <DashboardWrapper>
    <Sidebar>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><NavLink to="/admin/products">Manage Products</NavLink></li>
          <li><NavLink to="/admin/orders">Manage Orders</NavLink></li>
          <li><NavLink to="/admin/users">Manage Users</NavLink></li>
          <li><NavLink to="/admin/customers">Customers</NavLink></li>
        </ul>
      </nav>
    </Sidebar>
    <Content>
      <Routes>
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/orders" element={<ManageOrders />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/customers" element={<Customers />} />
      </Routes>
    </Content>
  </DashboardWrapper>
);

const ManageProducts = () => {
  console.log("ManageProducts Loaded");
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', description: 'Description 1', price: '$99' },
    { id: 2, name: 'Product 2', description: 'Description 2', price: '$199' },
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });

  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({ name: '', description: '', price: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <div>
      <h2>Product Management</h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.description} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ManageOrders = () => {
  const [orders] = useState([
    { id: 1, customer: 'John Doe', items: ['Product 1'], total: '$99' },
    { id: 2, customer: 'Jane Smith', items: ['Product 2'], total: '$199' },
  ]);

  return (
    <div>
      <h2>Order Management</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Customer: {order.customer}</p>
            <p>Items: {order.items.join(', ')}</p>
            <p>Total: {order.total}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ManageUsers = () => <h2>User Management</h2>;
const Customers = () => <h2>Customer Management</h2>;

export default AdminDashboard;

const DashboardWrapper = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #333;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  
  h2 {
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul li {
    padding: 15px 0;
    border-bottom: 1px solid #444;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #575757;
  }
`;

const Content = styled.div`
  margin-left: 250px;
  padding: 20px;
  
  h2 {
    color: #333;
    font-size: 24px;
  }
`;
