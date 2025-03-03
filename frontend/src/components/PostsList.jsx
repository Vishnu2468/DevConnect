import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Paper, Typography, TextField, InputAdornment, Backdrop } from '@mui/material';
import Post from './Post';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { PuffLoader } from 'react-spinners';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/posts/get/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      const data = await response.json();
      setTimeout(() => {
        setPosts(data);
        setFilteredPosts(data);
        setLoading(false);
        toast.success('Posts loaded successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          theme: "dark",
        });
      }, 2000); // Increased loading time
    } catch (error) {
      console.error('Error fetching posts:', error);
      setTimeout(() => {
        setLoading(false);
        toast.error('Failed to load posts!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          theme: "dark",
        });
      }, 2000);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {loading && (
        <Backdrop open={true} style={{ color: '#fff', zIndex: 1300 }}>
          <PuffLoader color="#00FF00" size={100} />
        </Backdrop>
      )}
      <Container
        maxWidth="lg"
        style={{
          paddingTop: '50px',
          marginTop: '30px',
          backgroundColor: '#181818',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <motion.h2
          className="text-center mb-4"
          style={{ color: '#fff', fontWeight: 'bold' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Posts
        </motion.h2>

        {/* Search Bar */}
        <motion.div
          className="d-flex justify-content-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TextField
            value={searchQuery}
            onChange={handleSearch}
            variant="outlined"
            fullWidth
            placeholder="Search posts by title..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: 'gray' }} />
                </InputAdornment>
              ),
            }}
            style={{
              backgroundColor: '#292929',
              color: 'white',
              borderRadius: '8px',
              padding: '5px 15px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
            }}
            inputProps={{
              style: { color: 'white' },
            }}
          />
        </motion.div>

        {/* Posts List */}
        <Grid container spacing={3}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: { duration: 0.1 },
                  }}
                >
                  <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#292929', borderRadius: '10px' }}>
                    <Post
                      postId={post.id}
                      title={post.title}
                      author={post.author}
                      content={post.content}
                      likes={post.like_count}
                      dislikes={post.dislike_count}
                      userId={post.user}
                    />
                  </Paper>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" color="textSecondary" align="center" style={{ width: '100%' }}>
              No posts found.
            </Typography>
          )}
        </Grid>

        {/* Toast Container for notifications */}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} />
      </Container>
    </>
  );
};

export default PostsList;
