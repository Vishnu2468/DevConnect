import React, { useState } from 'react';
import { Button, TextField, Typography, Card, CardContent, Box, Snackbar } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { TailSpin } from 'react-loader-spinner'; // Importing a beautiful spinner

const UserPostManager = ({ postId, title: initialTitle, author, content: initialContent, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);  // Track loading state

  const handleUpdate = async () => {
    setLoading(true); // Start loading
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/posts/${postId}/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Post updated successfully.');
        setIsEditing(false);
      } else {
        setMessage(data.error || 'Error updating post.');
      }
    } catch (error) {
      setMessage('Error updating post.');
    } finally {
      setOpenSnackbar(true);
      setLoading(false); // Stop loading
    }
  };

  const handleDelete = async () => {
    setLoading(true); // Start loading
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/posts/${postId}/delete/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setMessage('Post deleted successfully.');
        onDelete(postId); // Notify parent component
      } else {
        setMessage('Error deleting post.');
      }
    } catch (error) {
      setMessage('Error deleting post.');
    } finally {
      setOpenSnackbar(true);
      setLoading(false); // Stop loading
    }
  };

  return (
    <Card sx={{
      mb: 4,
      boxShadow: 3,
      backgroundColor: '#121212',
      color: '#fff',
    }}>
      <CardContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            {/* TailSpin Spinner */}
            <TailSpin
              height="80"
              width="80"
              color="#ff7a18" // You can change the color to match your theme
              ariaLabel="loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </Box>
        ) : isEditing ? (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>
              Edit Post
            </Typography>

            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                mb: 2,
                '& .MuiInputBase-root': { backgroundColor: '#333' },
                '& .MuiInputLabel-root': { color: '#bbb' },
                '& .MuiInputBase-input': { color: '#fff' },
              }}
            />

            <TextField
              label="Author"
              variant="outlined"
              fullWidth
              value={author}
              disabled
              sx={{
                mb: 2,
                '& .MuiInputBase-root': { backgroundColor: '#333' },
                '& .MuiInputLabel-root': { color: '#bbb' },
                '& .MuiInputBase-input': { color: '#fff' },
              }}
            />

            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{
                mb: 2,
                '& .MuiInputBase-root': { backgroundColor: '#333' },
                '& .MuiInputLabel-root': { color: '#bbb' },
                '& .MuiInputBase-input': { color: '#fff' },
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                startIcon={<SaveIcon />}
                sx={{ backgroundColor: '#4CAF50', color: '#fff' }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsEditing(false)}
                startIcon={<CancelIcon />}
                sx={{ color: '#bbb', borderColor: '#bbb' }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#fff' }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: '#bbb' }}>
              <strong>Author:</strong> {author}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: '#bbb' }}>
              {content}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setIsEditing(true)}
                startIcon={<EditIcon />}
                sx={{ color: '#bbb', borderColor: '#bbb' }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                startIcon={<DeleteIcon />}
                sx={{ color: '#f44336', borderColor: '#f44336' }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        )}

        {message && (
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
            message={message}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default UserPostManager;
