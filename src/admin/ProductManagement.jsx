import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ManageProducts = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);


  const refreshProductList = () => {

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  useEffect(() => {
    refreshProductList();
  }, [location.state?.refresh]);



  const handleAddProduct = () => {
    navigate('/admin/add');
  };

  const handleEdit = (index) => {

    const productToEdit = products[index];

    navigate('/admin/edit', {
      state: {
        productId: productToEdit._id
      }
    });
  };

  const handleDelete = (index) => {

    const productId = products[index]._id;

    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/products/${productId}`)
      .then(() => {

        const updatedProducts =
          products.filter((_, i) => i !== index);

        setProducts(updatedProducts);

      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const handleSelectProduct = (productId) => {

    navigate('/admin/message', {
      state: { productId }
    });
  };

  return (

    <Container>



      <Header>

        <Title>Product Management</Title>

        <Button onClick={handleAddProduct}>
          Add Product
        </Button>

      </Header>


      <TableWrapper>

        <Table>

          <thead>

            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
              <th>Comments</th>
            </tr>

          </thead>

          <tbody>

            {products.map((product, index) => (

              <tr key={product._id}>

                <td>
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                  />
                </td>

                <td>{product.name}</td>

                <DescriptionCell>
                  {product.description}
                </DescriptionCell>

                <td>Rs {product.price}</td>

                <td>

                  <ButtonGroup>

                    <ActionButton
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </ActionButton>

                    <DeleteButton
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </DeleteButton>

                  </ButtonGroup>

                </td>

                <td>

                  <CommentButton
                    onClick={() =>
                      handleSelectProduct(product._id)
                    }
                  >
                    View Comments
                  </CommentButton>

                </td>

              </tr>

            ))}

          </tbody>

        </Table>

      </TableWrapper>

    </Container>
  );
};



const Container = styled.div`
  width: 100%;
  padding: 15px;
  overflow-x: hidden;

  @media (min-width: 768px) {
    padding: 25px;
  }
`;



const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 15px;
  flex-wrap: wrap;

  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #222;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;



const Button = styled.button`
  padding: 10px 18px;

  background-color: #4caf50;
  color: white;

  border: none;
  border-radius: 8px;

  cursor: pointer;

  font-size: 0.95rem;

  transition: 0.2s ease;

  white-space: nowrap;

  &:hover {
    background-color: #45a049;
  }
`;

const ActionButton = styled.button`
  padding: 8px 14px;

  background-color: #2196f3;
  color: white;

  border: none;
  border-radius: 6px;

  cursor: pointer;

  font-size: 0.9rem;

  white-space: nowrap;

  &:hover {
    background-color: #1976d2;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #f44336;

  &:hover {
    background-color: #d32f2f;
  }
`;

const CommentButton = styled.button`
  padding: 8px 14px;

  background-color: #673ab7;
  color: white;

  border: none;
  border-radius: 6px;

  cursor: pointer;

  font-size: 0.9rem;

  white-space: nowrap;

  &:hover {
    background-color: #512da8;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: nowrap;
`;


const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  background: white;
  border-radius: 12px;

  box-shadow: 0 2px 10px rgba(0,0,0,0.08);

  /* scrollbar */

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cfcfcf;
    border-radius: 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  min-width: 950px;
  border-collapse: collapse;

  background: white;

  th,
  td {
    padding: 14px;
    border-bottom: 1px solid #eee;
    text-align: left;
    vertical-align: middle;
  }

  th {
    background-color: #f4f5fc;
    font-weight: bold;
    position: sticky;
    top: 0;
    z-index: 2;
  }

  tbody tr:hover {
    background-color: #fafafa;
  }

  @media (max-width: 768px) {

    th,
    td {
      padding: 12px;
      font-size: 0.9rem;
    }
  }
`;

const DescriptionCell = styled.td`
  max-width: 280px;
  min-width: 220px;

  word-break: break-word;
`;

const ProductImage = styled.img`
  width: 65px;
  height: 65px;

  object-fit: cover;

  border-radius: 8px;
`;

export default ManageProducts;