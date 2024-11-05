import React, { useState } from 'react';
import styled from 'styled-components';

const CustomerReview = ({ comments, newComment, setNewComment, handleAddComment }) => {
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingText, setEditingText] = useState('');
 

    const handleEditComment = (comment) => {
        setEditingCommentId(comment.id);
        setEditingText(comment.text);
      };
    
      const handleSaveEdit = async (commentId) => {
        // Make API call to save edited comment
        // Example: await axios.put(`/api/comments/${commentId}`, { text: editingText });
        
        // Update comments state (assuming you have a way to do that in parent)
        // setComments(updatedComments);
        setEditingCommentId(null);
        setEditingText('');
      };
    
      const handleDeleteComment = async (commentId) => {
        // Make API call to delete comment
        // Example: await axios.delete(`/api/comments/${commentId}`);
        
        // Update comments state
        // setComments(updatedComments);
      };
    



    return (
      <CommentsSection>
        <h3>Customer Reviews</h3>
        {comments.map((comment) => (
          <Comment key={comment.id}>
            <CommentUser>{comment.user}</CommentUser>
            {editingCommentId === comment.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(comment.id)}>Save</button>
                <button onClick={() => setEditingCommentId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <CommentText>{comment.text}</CommentText>
                <EditButton onClick={() => handleEditComment(comment)}>Edit</EditButton>
                <DeleteButton onClick={() => handleDeleteComment(comment.id)}>Delete</DeleteButton>
              </>
            )}
            {/* Render Admin replies here */}
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
  };
  
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
    color: #888;
  `;
  
  const AdminUser = styled.span`
    font-weight: bold;
  `;
  
  const ReplyText = styled.span`
    color: #666;
  `;
  
  export default CustomerReview;
      /*
    return (
    <CommentsSection>
      <h3>Customer Reviews</h3>
      {comments.map((comment) => (
        <Comment key={comment.id}>
          <CommentUser>{comment.user}</CommentUser>
          <CommentText>{comment.text}</CommentText>
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

// Styled Components for CustomerReview
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

export default CustomerReview;
*/