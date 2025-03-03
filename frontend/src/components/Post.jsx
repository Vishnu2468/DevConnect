import React, { useState, useEffect } from 'react';
import { Button, IconButton, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Box, Grid } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CommentsModal from './CommentsModel';  // Ensure this is the correct path
import 'react-toastify/dist/ReactToastify.css';

const Post = ({ postId, title, author, content, likes: initialLikes, dislikes: initialDislikes, userId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [subscribed, setSubscribed] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInteractionStatus = async () => {
      const accessToken = localStorage.getItem('accessToken');
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/post/${postId}/interaction-status/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        if (data.interaction_type === 'like') setIsLiked(true);
        else if (data.interaction_type === 'dislike') setIsDisliked(true);
      } catch (error) {
        console.error('Error fetching interaction status:', error);
      }
    };
    fetchInteractionStatus();
  }, [postId]);

  const handleLike = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/post/${postId}/like/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
      });
      if (response.ok) {
        setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
        if (isDisliked) setDislikes((prev) => prev - 1);
        setIsLiked(!isLiked);
        setIsDisliked(false);
        toast.success(isLiked ? 'Unliked post' : 'Liked post');
      }
    } catch {
      toast.error('Error processing like');
    }
  };

  const handleDislike = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/post/${postId}/dislike/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
      });
      if (response.ok) {
        setDislikes((prev) => (isDisliked ? prev - 1 : prev + 1));
        if (isLiked) setLikes((prev) => prev - 1);
        setIsDisliked(!isDisliked);
        setIsLiked(false);
        toast.warning(isDisliked ? 'Removed dislike' : 'Disliked post');
      }
    } catch {
      toast.error('Error processing dislike');
    }
  };

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
    toast.info(subscribed ? 'Unsubscribed from author' : 'Subscribed to author');
  };

  const openCommentsModal = () => setIsCommentsModalOpen(true);
  const closeCommentsModal = () => setIsCommentsModalOpen(false);

  const navigateToProfile = () => {
    navigate(`/user/${userId}`);
  };

  return (
    <Paper sx={{ padding: 2, backgroundColor: '#292929', borderRadius: '10px', color: '#fff', marginBottom: 3 }}>
      <Typography variant="h5" fontWeight="bold">{title}</Typography>

      {/* Author's Name (Clickable) */}
      <Typography 
        variant="body2" 
        color="#E0E0E0" 
        onClick={navigateToProfile} 
        style={{ cursor: 'pointer', textDecoration: 'underline' }}
      >
        Author: {author}
      </Typography>

      <Typography variant="body1" mt={1} color="#bbb">{content}</Typography>

      {/* Main Interaction Section (Like, Dislike, Comment, Follow) */}
      <Grid container spacing={2} alignItems="center" style={{ marginTop: 20 }}>

        <Grid item>
          <IconButton color={isLiked ? 'primary' : 'default'} onClick={handleLike}>
            <ThumbUpIcon />
          </IconButton>
          <span>{likes}</span>
        </Grid>

        <Grid item>
          <IconButton color={isDisliked ? 'error' : 'default'} onClick={handleDislike}>
            <ThumbDownIcon />
          </IconButton>
          <span>{dislikes}</span>
        </Grid>

        <Grid item>
          <IconButton color="info" onClick={openCommentsModal}>
            <CommentIcon />
          </IconButton>
        </Grid>

        <Grid item xs />

        {/* Container for Follow and Profile buttons */}
        <Grid item container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item>
            <Button 
              variant="contained" 
              color={subscribed ? 'error' : 'primary'} 
              onClick={handleSubscribe} 
              startIcon={subscribed ? <PersonRemoveIcon /> : <PersonAddIcon />}
            >
              {subscribed ? 'Unfollow' : 'Follow'}
            </Button>
          </Grid>

          <Grid item>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={navigateToProfile} 
              startIcon={<AccountCircleIcon />}
            >
              Profile
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Comments Modal */}
      <Dialog open={isCommentsModalOpen} onClose={closeCommentsModal}>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          <CommentsModal postId={postId} onClose={closeCommentsModal} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCommentsModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Post;
