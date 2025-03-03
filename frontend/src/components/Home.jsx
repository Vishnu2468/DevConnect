import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Backdrop } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PacmanLoader } from 'react-spinners'; // Unique Animated Spinner

const Home = ({ onSignOut }) => {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = localStorage.getItem('username');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("You must log in first!", { position: "top-right", autoClose: 3000 });
      navigate('/'); // Redirect to login page
    } else {
      toast.success(`Welcome back, ${user}!`, { position: "top-right", autoClose: 2000 });
    }

    // Fake loading effect
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Delay intro animation
    setTimeout(() => {
      setIsIntroComplete(true);
    }, 3500);
  }, [user, navigate]);

  // Spinner Effect
  if (isLoading) {
    return (
      <Backdrop sx={{ color: '#FFD700', zIndex: 9999 }} open={true}>
        <PacmanLoader color="#FFD700" size={40} />
      </Backdrop>
    );
  }

  // Welcome Animation Before Full Page Load
  if (!isIntroComplete) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#121212',
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ textAlign: 'center', color: '#4CAF50' }}
        >
          <CheckCircleIcon style={{ fontSize: '100px' }} />
          <Typography
            variant="h4"
            sx={{ color: '#fff', mt: 2, fontWeight: 'bold' }}
          >
            Welcome!
          </Typography>
        </motion.div>
      </Box>
    );
  }

  return (
    <>
      <Container
        maxWidth="lg"
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#121212',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h2"
            style={{
              fontWeight: 'bold',
              color: '#FFD700',
              marginBottom: '20px',
            }}
          >
            Welcome to My App
          </Typography>
        </motion.div>

        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h5"
            style={{
              color: '#E0E0E0',
              marginBottom: '30px',
            }}
          >
            Hello, {user}! 🎉 We're glad you're here.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{
              fontSize: '18px',
              padding: '12px 30px',
              borderRadius: '8px',
            }}
            onClick={() => toast.info('🚀 Explore feature coming soon!', { position: "top-right", autoClose: 2000 })}
          >
            Explore Now
          </Button>
        </motion.div>

        {/* Sign Out Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Button
            variant="contained"
            color="secondary"
            style={{
              fontSize: '18px',
              padding: '12px 30px',
              borderRadius: '8px',
              marginTop: '20px',
            }}
            onClick={() => {
              localStorage.removeItem('username');
              localStorage.removeItem('isLoggedIn');
              onSignOut();
              toast.success('👋 You have signed out!', { position: "top-right", autoClose: 2000 });
              navigate('/'); // Redirect to login page
            }}
          >
            Sign Out
          </Button>
        </motion.div>

        {/* Background Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          style={{ marginTop: '50px' }}
        >
          <Box
            sx={{
              width: '100%',
              height: '200px',
              background: 'url(https://source.unsplash.com/random/800x200/?technology,abstract)',
              backgroundSize: 'cover',
              borderRadius: '16px',
              boxShadow: '0px 5px 15px rgba(0,0,0,0.5)',
            }}
          />
        </motion.div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Home;
