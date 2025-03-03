import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserPostManager from './UserPostManage';  // Import the UserPostManager component
import { Box, Typography, Container, Paper, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify
import { TailSpin } from 'react-loader-spinner'; // Import the spinner from react-loader-spinner

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUserPosts = async () => {
    const accessToken = localStorage.getItem('accessToken');  // Get the token from local storage

    try {
      const response = await fetch('http://127.0.0.1:8000/api/posts/user/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,  // Send token in the header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        setLoading(false);
        toast.success('Posts loaded successfully!'); // Success toast
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to fetch posts');
        setLoading(false);
        toast.error(data.error || 'Failed to fetch posts'); // Error toast
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
      setError('Error fetching user posts');
      setLoading(false);
      toast.error('Error fetching user posts'); // Error toast
    }
  };

  useEffect(() => {
    // Simulate a longer loading time by setting a timeout
    setTimeout(() => {
      fetchUserPosts();
    }, 3000); // This will delay the data fetch for 3 seconds (3000ms)
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
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
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 8, pb: 4, backgroundColor: '#121212', borderRadius: 2, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fff', mb: 4, textAlign: 'center', background: 'linear-gradient(45deg, #ff7a18, #af7cfc)', backgroundClip: 'text', WebkitBackgroundClip: 'text' }}>
        Your Posts
      </Typography>

      {error && (
        toast.error(error, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          theme: 'dark',
        })
      )}

      {posts.length === 0 ? (
        <Typography variant="body1" sx={{ color: '#bbb', textAlign: 'center' }}>
          You haven't created any posts yet.
        </Typography>
      ) : (
        <Grid container spacing={5} sx={{ mt: 3 }}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Paper
                sx={{
                  backgroundColor: '#1E1E1E',
                  borderRadius: '12px',
                  boxShadow: 6,
                  padding: 4,  // Increase padding for posts
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 9,
                    transform: 'scale(1.02)',
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              >
                <UserPostManager
                  postId={post.id}
                  title={post.title}
                  author={post.author}
                  content={post.content}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Dark theme for toasts
      />
    </Container>
  );
};

export default UserPosts;
