import React, { useState, useEffect } from 'react';
import { loginUser } from './api'; // import login function
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { keyframes } from '@mui/system';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

// Animation for fade-in effect
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Set the body background color to black when the component mounts
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Attempt to log in with the provided username and password
      const data = await loginUser(username, password);

      // If login is successful, update the login state and navigate to home
      if (data) {
        onLogin(true);
        setError(''); // Clear any existing error messages
        toast.success('Login successful!'); // Show success toast
        navigate('/home'); // Redirect to the home page
      }
    } catch (err) {
      // Display the error message if login fails
      setError(err.message || 'Invalid credentials');
      toast.error(err.message || 'Invalid credentials'); // Show error toast
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        backgroundColor: '#000', // Entire background black for the container
        padding: 4,
        borderRadius: 2,
        mt: 10, // Padding on top to avoid navbar overlap
        animation: `${fadeIn} 1s ease-in`, // Fade-in animation
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)', // Shadow around the container
        border: '1px solid #bbb', // Border around the container (gray/white)
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>
          Login
        </Typography>
      </Box>

      {error && <Box sx={{ mb: 2 }}><Typography variant="body2" sx={{ color: '#f44336' }}>{error}</Typography></Box>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiInputBase-root': { backgroundColor: '#333' }, // Dark gray background for input
            '& .MuiInputLabel-root': { color: '#bbb' }, // Light gray label
            '& .MuiInputBase-input': { color: '#fff' }, // White text inside input fields
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#bbb' }, // Light gray border for input
          }}
          required
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 3,
            '& .MuiInputBase-root': { backgroundColor: '#333' },
            '& .MuiInputLabel-root': { color: '#bbb' },
            '& .MuiInputBase-input': { color: '#fff' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#bbb' }, // Light gray border for input
          }}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: '#4CAF50',
            transition: 'background-color 0.3s ease, transform 0.3s ease', // Smooth transition for hover
            '&:hover': { backgroundColor: '#388E3C', transform: 'scale(1.05)' }, // Hover effect (color change & slight scale)
          }}
        >
          Login
        </Button>
      </form>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#bbb' }}>
          Don't have an account?{' '}
          <a href="/signup" style={{ color: '#4CAF50' }}>
            Sign Up
          </a>
        </Typography>
      </Box>

      {/* ToastContainer to display toasts at top-right */}
      <ToastContainer
        position="top-right" // Positioning the toast at the top-right corner
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

export default Login;
