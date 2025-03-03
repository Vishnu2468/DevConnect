import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { PulseLoader } from 'react-spinners'; // PulseLoader from react-spinners

const Profile = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem('username');
  const mail = localStorage.getItem('email');
  const access = localStorage.getItem('accessToken');

  const [formData, setFormData] = useState({
    username: user,
    email: mail,
    phone: '',
    bio: '',
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const apiUrl = 'http://127.0.0.1:8000/api/user/profile/data';
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            username: user,
            email: mail,
            phone: data.phone || '',
            bio: data.bio || '',
          });
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    // Adding a longer delay for the spinner
    setTimeout(() => {
      fetchProfile();
    }, 1500); // Delay of 1.5 seconds before calling the API

  }, [user, mail, access]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isPhoneValid = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phone || !formData.bio) {
      toast.error('Please make sure to fill in your phone number and bio!', {
        position: 'top-center',
        style: {
          background: 'linear-gradient(135deg, #ff4e50, #f9d423)',
          color: 'white',
          borderRadius: '12px',
          padding: '12px 24px',
          fontWeight: 'bold',
          fontSize: '16px',
        },
      });
      return;
    }

    if (!isPhoneValid(formData.phone)) {
      toast.error('Your phone number must be 10 digits long.', {
        position: 'top-center',
        style: {
          background: 'linear-gradient(135deg, #f9d423, #ff4e50)',
          color: 'white',
          borderRadius: '12px',
          padding: '12px 24px',
          fontWeight: 'bold',
          fontSize: '16px',
        },
      });
      return;
    }

    setLoading(true);

    const apiUrl = 'http://127.0.0.1:8000/api/user/profile/update';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Profile updated successfully! 🎉', {
          position: 'top-center',
          style: {
            background: 'linear-gradient(135deg, #28a745, #21c2a3)',
            color: 'white',
            borderRadius: '12px',
            padding: '12px 24px',
            fontWeight: 'bold',
            fontSize: '16px',
          },
        });
      } else {
        toast.error('Failed to update profile. Please try again.', {
          position: 'top-center',
          style: {
            background: '#ff6b6b',
            color: 'white',
            borderRadius: '12px',
            padding: '12px 24px',
            fontWeight: 'bold',
            fontSize: '16px',
          },
        });
      }
    } catch (error) {
      toast.error('There was an error updating your profile. Please try again later.', {
        position: 'top-center',
        style: {
          background: '#f39c12',
          color: 'white',
          borderRadius: '12px',
          padding: '12px 24px',
          fontWeight: 'bold',
          fontSize: '16px',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Container
        maxWidth="sm"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'black', // Full-screen black background
        }}
      >
        <PulseLoader size={15} color="#ffffff" loading={initialLoading} />
      </Container>
    );
  }

  return (
    <Container
      maxWidth="sm"
      style={{
        paddingTop: '80px',
        minHeight: '100vh', // Ensure full height of the page is covered
        color: 'white', // Make sure text stays readable on dark background
      }}
    >
      <Paper
        elevation={5}
        style={{
          padding: '24px',
          borderRadius: '12px',
          backgroundColor: '#444',
          boxShadow: '0px 10px 30px rgba(85, 78, 78, 0.61)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom style={{ color: 'white' }}>
          Profile Page
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white', backgroundColor: 'gray', borderRadius: '10px' },
            }}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white', backgroundColor: 'gray', borderRadius: '10px' },
            }}
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
          />
          <TextField
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{
              marginTop: '16px',
              background: '#666',
              color: 'white',
              borderRadius: '8px',
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
          </Button>
        </form>
      </Paper>
      <Toaster />
    </Container>
  );
};

export default Profile;
