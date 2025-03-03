import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ListIcon from '@mui/icons-material/List';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Cookies from 'js-cookie';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onSignOut }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = async () => {
    // Clear stored authentication data
    Cookies.remove('accessToken');
    localStorage.removeItem('accessToken');
    
    // Navigate to login page and replace history to prevent back navigation
    navigate('/', { replace: true });
    
    // Reload the page to fully reset authentication state
    window.location.reload();
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#121212' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff', fontWeight: 'bold' }}>
            My App
          </Typography>

          <div className="d-none d-lg-block">
            <Button component={Link} to="/home" sx={{ color: '#fff', fontWeight: 'bold' }}>
              Home
            </Button>
            <Button component={Link} to="/profile" sx={{ color: '#fff', fontWeight: 'bold' }}>
              Profile
            </Button>
            <Button component={Link} to="/posts" sx={{ color: '#fff', fontWeight: 'bold' }}>
              Posts
            </Button>
            <Button component={Link} to="/user-post" sx={{ color: '#fff', fontWeight: 'bold' }}>
              My Posts
            </Button>
            <Button component={Link} to="/add-post" sx={{ color: '#fff', fontWeight: 'bold' }}>
              Add Post
            </Button>
          </div>

          <Button onClick={handleLogout} sx={{ color: '#f44336', fontWeight: 'bold' }}>
            <ExitToAppIcon sx={{ marginRight: 1 }} />
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              PaperProps={{
                sx: { backgroundColor: '#1E1E1E', color: '#fff', width: 250 },
              }}
            >
              <List>
                {[{ text: 'Home', icon: <HomeIcon />, link: '/home' },
                  { text: 'Profile', icon: <PersonIcon />, link: '/profile' },
                  { text: 'Posts', icon: <ListIcon />, link: '/posts' },
                  { text: 'My Posts', icon: <PostAddIcon />, link: '/user-post' },
                  { text: 'Add Post', icon: <PostAddIcon />, link: '/add-post' }]
                  .map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <ListItem button component={Link} to={item.link} onClick={handleDrawerToggle}>
                        <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
                        <ListItemText
                          primary={item.text}
                          sx={{ '& span': { fontWeight: 'bold', color: '#ddd' } }}
                        />
                      </ListItem>
                    </motion.div>
                  ))}
              </List>

              <ListItem button onClick={handleLogout}>
                <ListItemIcon sx={{ color: '#f44336' }}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ fontWeight: 'bold', color: '#f44336' }} />
              </ListItem>
            </Drawer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
