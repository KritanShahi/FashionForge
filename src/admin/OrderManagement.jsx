import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderManagement = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  useEffect(() => {

    const fetchOrders = async () => {

      try {

        setLoading(true);

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders`
        );

        setOrders(response.data);

        setLoading(false);

      } catch (error) {

        console.error('Error fetching orders:', error);

        setLoading(false);

      }
    };

    fetchOrders();

  }, []);


  const cancelOrder = async (orderId) => {

    try {

      const updatedOrder = orders.find(
        (order) => order._id === orderId
      );

      updatedOrder.status = 'Cancelled';

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/orders/${orderId}/cancel`,
        updatedOrder
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? updatedOrder : order
        )
      );

    } catch (error) {

      console.error('Error cancelling order:', error);

    }
  };

  return (

    <Container>

      <Title>Order Management</Title>

      {loading ? (

        <LoadingText>Loading orders...</LoadingText>

      ) : (

        <TableWrapper>

          <Table>

            <thead>

              <tr>

                <th>Customer Name</th>
                <th>Items</th>
                <th>Status</th>
                <th>Total</th>
                <th>Delivery Date</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr key={order._id}>

                  <td>{order.name || 'N/A'}</td>

                  <td>

                    {order.products?.length > 0
                      ? order.products
                          .map((product) => product.productId?.name)
                          .join(', ')
                      : 'N/A'}

                  </td>

                  <td>{order.status}</td>

                  <td>Rs {order.total}</td>

                  <td>

                    {order.deliveryDate
                      ? new Date(order.deliveryDate).toLocaleDateString()
                      : 'N/A'}

                  </td>

                  <td>

                    <ButtonGroup>

                      {order.status !== 'Delivered' &&
                        order.status !== 'Cancelled' && (
                          <>
                            <CancelButton
                              onClick={() => cancelOrder(order._id)}
                            >
                              Cancel
                            </CancelButton>

                            <ViewButton
                              onClick={() =>
                                navigate(`/admin/order/${order._id}`)
                              }
                            >
                              View
                            </ViewButton>
                          </>
                        )}

                      {(order.status === 'Delivered' ||
                        order.status === 'Cancelled') && (

                        <ViewButton
                          onClick={() =>
                            navigate(`/admin/order/${order._id}`)
                          }
                        >
                          View
                        </ViewButton>

                      )}

                    </ButtonGroup>

                  </td>

                </tr>

              ))}

            </tbody>

          </Table>

        </TableWrapper>

      )}

    </Container>
  );
};



const Container = styled.div`
  width: 100%;
  min-width: 0;

  padding: 15px;

  background-color: #f9fafc;

  box-sizing: border-box;

  overflow-x: hidden;

  @media (min-width: 768px) {
    padding: 25px;
  }
`;



const Title = styled.h2`
  margin-bottom: 20px;

  font-size: 1.5rem;
  font-weight: 600;

  color: #222;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;


const LoadingText = styled.p`
  font-size: 16px;
  color: #555;
`;


const TableWrapper = styled.div`
  width: 100%;

  overflow-x: auto;

  -webkit-overflow-scrolling: touch;

  border-radius: 10px;
`;

const Table = styled.table`
  width: 100%;
  min-width: 750px;

  border-collapse: collapse;

  background: white;

  border-radius: 10px;

  overflow: hidden;

  box-shadow: 0 4px 10px rgba(0,0,0,0.08);

  th,
  td {
    padding: 12px;

    text-align: left;

    border-bottom: 1px solid #eee;

    font-size: 13px;

    white-space: nowrap;
  }

  th {
    background-color: #eef2ff;

    color: #333;

    font-weight: 600;
  }

  tbody tr:hover {
    background-color: #f5f7ff;
  }

  @media (min-width: 768px) {

    th,
    td {
      padding: 14px 16px;
      font-size: 15px;
    }
  }
`;



const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;


const ActionButton = styled.button`
  padding: 8px 14px;

  border: none;
  border-radius: 6px;

  color: white;

  font-size: 13px;

  cursor: pointer;

  transition: 0.3s;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const ViewButton = styled(ActionButton)`
  background-color: #007bff;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled(ActionButton)`
  background-color: #dc3545;

  &:hover {
    background-color: #b02a37;
  }
`;

export default OrderManagement;