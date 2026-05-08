import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const WaitingOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders`,
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updatedOrder = orders.find((o) => o._id === orderId);

      const updatedData = {
        ...updatedOrder,
        status: newStatus,
        deliveryDate:
          newStatus === "Delivered" ? new Date().toISOString() : null,
      };

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/orders/${orderId}`,
        updatedData,
      );

      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? updatedData : order)),
      );
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const updatedOrder = orders.find((o) => o._id === orderId);

      const updatedData = {
        ...updatedOrder,
        status: "Cancelled",
      };

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/orders/${orderId}/cancel`,
        updatedData,
      );

      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? updatedData : order)),
      );
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  return (
    <Container>
      <Title>Your Orders</Title>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
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
                  <td data-label="Items">
                    {order.products?.length
                      ? order.products.map((p) => p.productId?.name).join(", ")
                      : "N/A"}
                  </td>

                  <td data-label="Status">{order.status}</td>

                  <td data-label="Total">Rs {order.total}</td>

                  <td data-label="Delivery Date">
                    {order.deliveryDate
                      ? new Date(order.deliveryDate).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td data-label="Action">
                    {order.status !== "Cancelled" && (
                      <ButtonGroup>
                        <ActionButton
                          danger
                          onClick={() => cancelOrder(order._id)}
                        >
                          Cancel
                        </ActionButton>

                        <ActionButton
                          onClick={() =>
                            handleStatusChange(order._id, "Delivered")
                          }
                        >
                          Delivered
                        </ActionButton>
                      </ButtonGroup>
                    )}
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

export default WaitingOrder;

const Container = styled.div`
  padding: 20px;
  max-width: 1100px;
  margin: auto;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const Title = styled.h2`
  margin-bottom: 15px;
  text-align: center;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
  }

  th {
    background: #f4f4f4;
  }

  @media (max-width: 768px) {
    th,
    td {
      font-size: 13px;
      padding: 10px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  background: ${(props) => (props.danger ? "#ff4d4d" : "#007bff")};
  color: white;

  font-size: 12px;

  &:hover {
    opacity: 0.85;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;
