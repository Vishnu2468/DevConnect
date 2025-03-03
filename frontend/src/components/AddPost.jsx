import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, Backdrop } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BeatLoader } from 'react-spinners'; // New animated spinner

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setPageLoading(false), 1200); // Simulating page loading delay
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const apiUrl = 'http://127.0.0.1:8000/api/posts/'; // Backend URL
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Post successfully created! Redirecting...', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        toast.error(`${data.message || 'Something went wrong! Please try again.'}`, {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error('Network issue! Please check your connection.', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Full-Page Loading Animation */}
      {pageLoading ? (
        <Backdrop sx={{ color: '#fff', zIndex: 9999 }} open={true}>
          <BeatLoader color="#ffffff" size={15} />
        </Backdrop>
      ) : (
        <Container
          maxWidth="sm"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            paddingTop: '64px',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#f5f5f5',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              width: '100%',
              height: 'auto',
              maxWidth: '500px',
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#333' }}
            >
              Create a New Post
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                InputLabelProps={{ style: { color: '#555' } }}
                InputProps={{
                  style: { color: '#333', backgroundColor: '#fff', borderRadius: '8px' },
                }}
              />
              <TextField
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                multiline
                rows={4}
                InputLabelProps={{ style: { color: '#555' } }}
                InputProps={{
                  style: { color: '#333', backgroundColor: '#fff', borderRadius: '8px' },
                }}
              />
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#333',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#555',
                    },
                    borderRadius: '8px',
                    padding: '8px 24px',
                    fontWeight: 'bold',
                    minWidth: '140px',
                  }}
                  disabled={loading}
                >
                  {loading ? <BeatLoader color="#ffffff" size={10} /> : 'Create Post'}
                </Button>
              </Box>
            </Box>
          </Box>
          <ToastContainer />
        </Container>
      )}
    </>
  );
};

export default AddPost;
