
// import React, { useEffect, useState } from 'react'; 
// import styled from 'styled-components';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const ManageProducts = () => {
//   const navigate = useNavigate(); // Initialize useNavigate
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '' });
//   const [editing, setEditing] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);
  
//   // Fetch products from the backend on component mount
//   useEffect(() => {
//     axios.get('http://localhost:8080/api/products')
//       .then(response => {
//         setProducts(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching products:', error);
//       });
//   }, []);

//   const handleAddProduct = () => {
//     if (editing) {
//       // Update product on the backend
//       const updatedProduct = { ...newProduct, id: products[editingIndex]._id };
//       axios.put(`http://localhost:8080/api/products/${updatedProduct.id}`, updatedProduct)
//         .then(response => {
//           const updatedProducts = [...products];
//           updatedProducts[editingIndex] = response.data;
//           setProducts(updatedProducts);
//           setEditing(false);
//           setEditingIndex(null);
//         })
//         .catch(error => {
//           console.error('Error updating product:', error);
//         });
//     } else {
//       // Add new product to the backend
//       axios.post('http://localhost:8080/api/products', newProduct)
//         .then(response => {
//           setProducts([...products, response.data]);
//         })
//         .catch(error => {
//           console.error('Error adding product:', error);
//         });
//     }
//     setNewProduct({ name: '', description: '', price: '', image: '' });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduct({ ...newProduct, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setNewProduct({ ...newProduct, image: reader.result });
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleEdit = (index) => {
//     setNewProduct(products[index]);
//     setEditing(true);
//     setEditingIndex(index);
//   };*/
//   const handleEdit = (index) => {
//     const productToEdit = products[index];
//     navigate('/admin/edit', { state: { productId: productToEdit._id } }); // Navigate to EditProduct with productId
//   };
  

//   const handleDelete = (index) => {
//     const productId = products[index]._id;
//     axios.delete(`http://localhost:8080/api/products/${productId}`)
//       .then(() => {
//         const updatedProducts = products.filter((_, i) => i !== index);
//         setProducts(updatedProducts);
//       })
//       .catch(error => {
//         console.error('Error deleting product:', error);
//       });
//   };

//   // Function to select a product and navigate to the MessageDashboard
//   const handleSelectProduct = (productId) => {
//     navigate('/admin/message', { state: { productId } }); // Navigate to MessageDashboard with productId
//   };

//   return (
//     <Container>
//       <h2>Product Management</h2>
//       <Form>
//         <Input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           value={newProduct.name}
//           onChange={handleInputChange}
//         />
//         <Input
//           type="text"
//           name="description"
//           placeholder="Product Description"
//           value={newProduct.description}
//           onChange={handleInputChange}
//         />
//         <Input
//           type="text"
//           name="price"
//           placeholder="Product Price"
//           value={newProduct.price}
//           onChange={handleInputChange}
//         />
//         <Input
//           type="file"
//           name="image"
//           onChange={handleImageChange}
//         />
//         <Button onClick={handleAddProduct}>{editing ? 'Save' : 'Add Product'}</Button>
//       </Form>
//       <Table>
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Action</th>
//             <th>Comments</th> {/* Add a column for comments */}
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product, index) => (
//             <tr key={product._id}>
//               <td><img src={product.image} alt={product.name} width="50" /></td>
//               <td>{product.name}</td>
//               <td>{product.description}</td>
//               <td>{product.price}</td>
//               <td>
//                 <ActionButton onClick={() => handleEdit(index)}>Edit</ActionButton>
//                 <ActionButton onClick={() => handleDelete(index)}>Delete</ActionButton>
//               </td>
//               <td>
//                 {/* Add a button to open the MessageDashboard */}
//                 <ActionButton onClick={() => handleSelectProduct(product._id)}>View Comments</ActionButton>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };



// // Styled-components for styling

// const Container = styled.div`
//   padding: 20px;
// `;

// const Form = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   margin-bottom: 20px;
// `;

// const Input = styled.input`
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const Button = styled.button`
//   padding: 10px;
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     background-color: #45a049;
//   }
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin-top: 20px;
//   th, td {
//     padding: 10px;
//     border: 1px solid #ddd;
//     text-align: left;
//   }
// `;

// const ActionButton = styled.button`
//   padding: 5px 10px;
//   margin: 0 5px;
//   background-color: #2196F3;
//   color: white;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
//   &:hover {
//     background-color: #1976D2;
//   }
// `;


// export default ManageProducts;

