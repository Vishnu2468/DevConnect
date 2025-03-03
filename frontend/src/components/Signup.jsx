import React, { useState, useEffect } from 'react';
import { signUpUser } from './api'; // Import sign-up function
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
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

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Set the body background color to black when the component mounts
  useEffect(() => {
    // document.body.style.backgroundColor = 'black';
    return () => {
      document.body.style.backgroundColor = ''; // Clean up and reset to default when the component unmounts
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match'); // Show error toast
      return;
    }

    try {
      // Sign up the user with username, email, and password
      await signUpUser(username, email, password);
      setError('');
      toast.success('Sign up successful!'); // Show success toast
      navigate('/'); // Navigate to login page after successful sign-up
    } catch (err) {
      setError('Signup failed');
      toast.error('Signup failed'); // Show error toast
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        padding: 4,
        borderRadius: 2,
        mt: 10, // Padding on top to avoid navbar overlap
        animation: `${fadeIn} 1s ease-in`, // Fade-in animation
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)', // Shadow around the container
        border: '1px solid #bbb', // Border around the container (gray/white)
        minHeight: '100vh', // Ensure full height of the viewport
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>
          Sign Up
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
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiInputBase-root': { backgroundColor: '#333' },
            '& .MuiInputLabel-root': { color: '#bbb' },
            '& .MuiInputBase-input': { color: '#fff' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#bbb' },
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
            mb: 2,
            '& .MuiInputBase-root': { backgroundColor: '#333' },
            '& .MuiInputLabel-root': { color: '#bbb' },
            '& .MuiInputBase-input': { color: '#fff' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#bbb' },
          }}
          required
        />

        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            mb: 3,
            '& .MuiInputBase-root': { backgroundColor: '#333' },
            '& .MuiInputLabel-root': { color: '#bbb' },
            '& .MuiInputBase-input': { color: '#fff' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#bbb' },
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
          Sign Up
        </Button>
      </form>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#bbb' }}>
          Already have an account?{' '}
          <a href="/" style={{ color: '#4CAF50' }}>
            Login
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

export default SignUp;
