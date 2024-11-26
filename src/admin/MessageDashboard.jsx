
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const MessageDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const [replyId, setReplyId] = useState(null);
  const [editReplyId, setEditReplyId] = useState(null);
  const [editReplyText, setEditReplyText] = useState('');

  const location = useLocation();
  const { productId } = location.state || {};

  useEffect(() => {
    if (productId) {
      axios.get(`http://localhost:8080/api/products/${productId}`)
        .then((response) => {
          const allComments = response.data.comments || [];
          setMessages(allComments);
        })
        .catch((error) => {
          console.error('Error fetching messages:', error);
        });
    }
  }, [productId]);

  const handleReply = (commentId) => {
    if (!reply.trim()) {
      alert("Reply cannot be empty!");
      return;
    }

    axios.post(`http://localhost:8080/api/comment/${productId}/comments/${commentId}/reply`, { user: 'currentUser', text: reply })
      .then((response) => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === commentId ? { ...msg, replies: [...(msg.replies || []), response.data] } : msg
          )
        );
        setReply('');
        setReplyId(null);
      })
      .catch((error) => {
        console.error('Error sending reply:', error);
      });
  };

  const deleteComment = (commentId) => {
    axios.delete(`http://localhost:8080/api/comment/${productId}/comments/${commentId}`)
      .then(() => {
        setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== commentId));
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
  };

  const deleteReply = (commentId, replyId) => {
    axios.delete(`http://localhost:8080/api/comment/${productId}/comments/${commentId}/replies/${replyId}`)
      .then(() => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === commentId
              ? { ...msg, replies: msg.replies.filter((reply) => reply._id !== replyId) }
              : msg
          )
        );
      })
      .catch((error) => {
        console.error('Error deleting reply:', error);
      });
  };

  const handleEditReply = (commentId, replyId, text) => {
    setEditReplyId(replyId);
    setEditReplyText(text);
  };

  const submitEditReply = (commentId) => {
    axios.put(`http://localhost:8080/api/comment/${productId}/comments/${commentId}/replies/${editReplyId}`, { text: editReplyText })
      .then((response) => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === commentId
              ? {
                  ...msg,
                  replies: msg.replies.map((reply) =>
                    reply._id === editReplyId ? { ...reply, text: editReplyText } : reply
                  )
                }
              : msg
          )
        );
        setEditReplyId(null);
        setEditReplyText('');
      })
      .catch((error) => {
        console.error('Error editing reply:', error);
      });
  };

  return (
    <Container>
      <h2>Comments</h2>
      {messages.map((message) => (
        <Comment key={message._id}>
          <MessageHeader>
            <span>{message.user}</span>
            <span>{new Date(message.date).toLocaleDateString()}</span>
          </MessageHeader>
          <p>{message.text}</p>
          <Actions>
            <ActionButton onClick={() => setReplyId(message._id)}>Reply</ActionButton>
            <ActionButton onClick={() => deleteComment(message._id)}>Delete</ActionButton>
          </Actions>
     
          {replyId === message._id && (
  <ReplyBox>
    <input
      type="text"
      value={reply}
      onChange={(e) => setReply(e.target.value)}
      placeholder="Type your reply here"
    />
    <ActionButton onClick={() => handleReply(message._id)}>Send Reply</ActionButton>
    <ActionButton onClick={() => { setReply(''); setReplyId(null); }}>Cancel</ActionButton>
  </ReplyBox>
)}

         
          {message.replies && message.replies.length > 0 && (
            <RepliesContainer>
              {message.replies.map((reply) => (
                <Reply key={reply._id}>
                  <MessageHeader>
                    <span>{reply.user}</span>
                    <span>{new Date(reply.date).toLocaleDateString()}</span>
                  </MessageHeader>
                  {editReplyId === reply._id ? (
                    <EditBox>
                      <input
                        type="text"
                        value={editReplyText}
                        onChange={(e) => setEditReplyText(e.target.value)}
                      />
                      <ActionButton onClick={() => submitEditReply(message._id)}>Save</ActionButton>
                    </EditBox>
                  ) : (
                    <p>{reply.text}</p>
                  )}
                  <Actions>
                    <ActionButton onClick={() => handleEditReply(message._id, reply._id, reply.text)}>Edit</ActionButton>
                    <ActionButton onClick={() => deleteReply(message._id, reply._id)}>Delete</ActionButton>
                  </Actions>
                </Reply>
              ))}
            </RepliesContainer>
          )}
        </Comment>
      ))}
    </Container>
  );
};
   
// Styled components
const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 1em;
`;

const Comment = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 1em 0;
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
  color: #555;
`;

const Actions = styled.div`
  margin-top: 0.5em;
`;

const ActionButton = styled.button`
  margin-right: 0.5em;
  padding: 0.4em 0.8em;
  font-size: 0.9em;
  cursor: pointer;
`;

const ReplyBox = styled.div`
  margin-top: 0.5em;
  display: flex;
  input {
    flex: 1;
    padding: 0.4em;
  }
`;

const RepliesContainer = styled.div`
  margin-top: 1em;
  margin-left: 2em;
  border-left: 2px solid #eee;
  padding-left: 1em;
`;

const Reply = styled.div`
  margin-top: 0.5em;
  font-size: 0.9em;
  color: #333;
`;

const EditBox = styled.div`
  display: flex;
  input {
    flex: 1;
    padding: 0.4em;
  }
`;

export default MessageDashboard;

