import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CustomerReview = ({ comments, newComment, setNewComment, handleAddComment, handleEditComment, handleDeleteComment }) => {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const startEditingComment = (comment) => {
      setEditingCommentId(comment._id);
      setEditingText(comment.text);
  };

  const saveEditComment = () => {
      handleEditComment(editingCommentId, editingText); 
      setEditingCommentId(null);
      setEditingText('');
  };

  return (
    <CommentsSection>
      <h3>Customer Reviews</h3>
      {comments.map((comment) => (
        <Comment key={comment._id}>
          <CommentUser>{comment.user || 'Anonymous User'}</CommentUser> {/* Show the commenter's name */}
          {editingCommentId === comment._id ? (
            <>
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
              <button onClick={saveEditComment}>Save</button>
              <button onClick={() => setEditingCommentId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <CommentText>{comment.text}</CommentText>
              <EditButton onClick={() => startEditingComment(comment)}>Edit</EditButton>
              <DeleteButton onClick={() => handleDeleteComment(comment._id)}>Delete</DeleteButton>
            </>
          )}
          {/* Render Admin replies here */}
          {comment.replies && comment.replies.map((reply) => (
            <Reply key={reply._id}>
              <AdminUser>{reply.adminUser || 'Admin'}</AdminUser> {/* Show the admin's name */}
              <ReplyText>{reply.text}</ReplyText>
            </Reply>
          ))}
        </Comment>
      ))}
      <AddComment>
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <CommentButton onClick={handleAddComment}>Submit</CommentButton>
      </AddComment>
    </CommentsSection>
  );
};


/*// In CustomerReview component
const CustomerReview = ({ comments, newComment, setNewComment, handleAddComment, handleEditComment, handleDeleteComment }) => {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const startEditingComment = (comment) => {
    setEditingCommentId(comment._id); // Use _id to identify the comment
    setEditingText(comment.text);     // Set the current comment text in the state
  };

  const saveEditComment = () => {
    if (editingText.trim() !== '') { // Check if the text is not empty
      handleEditComment(editingCommentId, editingText); // Pass the comment _id and the updated text
      setEditingCommentId(null);   // Clear the editing state
      setEditingText('');          // Clear the input after saving
    } else {
      alert('Comment cannot be empty'); // Optional: alert if the comment is empty
    }
  };

  return (
    <CommentsSection>
      <h3>Customer Reviews</h3>
      {comments.map((comment) => (
        <Comment key={comment._id}>
          <CommentUser>{comment.user}</CommentUser>
          {editingCommentId === comment._id ? (
            <>
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)} // Update the editingText state
              />
              <button onClick={saveEditComment}>Save</button>
              <button onClick={() => setEditingCommentId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <CommentText>{comment.text}</CommentText>
              <EditButton onClick={() => startEditingComment(comment)}>Edit</EditButton>
              <DeleteButton onClick={() => handleDeleteComment(comment._id)}>Delete</DeleteButton>
            </>
          )}
          {/* Render Admin replies here 
          {comment.replies && comment.replies.map((reply) => (
            <Reply key={reply.id}>
              <AdminUser>{reply.adminUser}</AdminUser>
              <ReplyText>{reply.text}</ReplyText>
            </Reply>
          ))}
        </Comment>
      ))}
      <AddComment>
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <CommentButton onClick={handleAddComment}>Submit</CommentButton>
      </AddComment>
    </CommentsSection>
  );
};*/

  
  // Styled Components for the CustomerReview component
  const CommentsSection = styled.div`
    margin-top: 30px;
  `;
  
  const Comment = styled.div`
    margin-top: 10px;
  `;
  
  const CommentUser = styled.span`
    font-weight: bold;
    margin-right: 10px;
  `;
  
  const CommentText = styled.span`
    color: #666;
  `;
  
  const EditButton = styled.button`
    margin-left: 10px;
    cursor: pointer;
  `;
  
  const DeleteButton = styled.button`
    margin-left: 10px;
    cursor: pointer;
    color: red;
  `;
  
  const AddComment = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
  
    input {
      flex: 1;
      padding: 10px;
      margin-right: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  `;
  
  const CommentButton = styled.button`
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #45a049;
    }
  `;
  
  const Reply = styled.div`
    margin-left: 20px;
    margin-top: 5px;

    
  `;
  
  const AdminUser = styled.span`
    font-weight: bold;
    
  `;
  
  const ReplyText = styled.span`
    color: #666;
    
  `;
  
  export default CustomerReview;
   