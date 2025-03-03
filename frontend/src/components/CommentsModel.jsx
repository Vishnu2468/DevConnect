import React, { useState, useEffect } from 'react';

const CommentsModal = ({ postId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch Comments
  const fetchComments = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/post/${postId}/comments/`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Add a New Comment
  const handleAddComment = async () => {
    const accessToken = localStorage.getItem('accessToken');
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/post/${postId}/add-comment/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        setNewComment('');
        fetchComments(); // Refresh comments
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="modal-content"
        style={{
          background: '#1c1c1c', // Dark background for the modal content
          color: '#fff', // White text color for contrast
          borderRadius: '8px',
          width: '50%',
          padding: '20px',
          maxHeight: '80%',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* Modal Header with Close Button */}
        <div className="modal-header" style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <button
            className="btn-close"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              color: '#fff', // White color for close button
              cursor: 'pointer',
            }}
          >
            &times;
          </button>
        </div>

        <h5 style={{ color: '#fff', marginBottom: '10px' }}>Comments</h5>

        <div className="modal-body">
          {comments.map((comment) => (
            <div key={comment.id} className="mb-3" style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>
              <strong style={{ color: '#fff' }}>{comment.author_username}</strong>
              <p style={{ color: '#ccc' }}>{comment.content}</p>
            </div>
          ))}
          
          {/* New Comment Input */}
          <textarea
            className="form-control"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{
              backgroundColor: '#333', // Dark background for the input
              color: '#fff', // White text
              border: '1px solid #555', // Subtle border
              borderRadius: '5px',
              width: '100%',
              height: '100px',
              padding: '10px',
              fontSize: '14px',
              marginBottom: '10px',
            }}
          />
          
          <button
            className="btn btn-primary mt-2"
            onClick={handleAddComment}
            disabled={loading || !newComment.trim()}
            style={{
              backgroundColor: '#333', // Dark background for button
              color: '#fff', // White text
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            {loading ? 'Adding...' : 'Add Comment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
