import React, { useState } from 'react';
import styled from 'styled-components';

const Messages = () => {
  // Example message data
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John Doe', content: 'Can you help with my order?', date: '2024-10-27', status: 'Unread' },
    { id: 2, sender: 'Jane Smith', content: 'Order received, but missing items.', date: '2024-10-26', status: 'Read' },
    { id: 3, sender: 'Sam Lee', content: 'Question about product warranty.', date: '2024-10-25', status: 'Unread' },
  ]);

  // Toggle read/unread status
  const toggleReadStatus = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, status: msg.status === 'Unread' ? 'Read' : 'Unread' } : msg
      )
    );
  };

  // Delete message
  const deleteMessage = (id) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  };

  return (
    <Container>
      <h2>Messages</h2>
      <MessageTable>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Message</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{message.sender}</td>
              <td>{message.content}</td>
              <td>{message.date}</td>
              <td>{message.status}</td>
              <td>
                <ActionButton onClick={() => toggleReadStatus(message.id)}>
                  {message.status === 'Unread' ? 'Mark as Read' : 'Mark as Unread'}
                </ActionButton>
                <ActionButton onClick={() => deleteMessage(message.id)}>Delete</ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </MessageTable>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  padding: 20px;
`;

// const MessageTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin-top: 20px;

//   th, td {
//     padding: 10px;
//     border: 1px solid #ddd;
//     text-align: left;
//   }

//   th {
//     background-color: #eef2ff;
//   }
// `;

// const ActionButton = styled.button`
//   padding: 5px 10px;
//   margin: 0 5px;
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
//   &:hover {
//     background-color: #45a049;
//   }
// `;
// ActionButton and Table updates
const ActionButton = styled.button`
  padding: 5px 10px;
  margin: 2px; /* Reduced margin to avoid too much spacing */
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const MessageTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
    vertical-align: middle; /* Center aligns vertically */
  }

  th {
    background-color: #eef2ff;
  }

  /* Align the action buttons in the center */
  td:last-child {
    display: flex;
    justify-content: center;
    gap: 8px; /* Space between buttons */
  }
`;


export default Messages;
