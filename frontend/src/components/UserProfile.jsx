import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, CardContent, Typography, Button, Box, Grid, Paper, IconButton, TextField, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";

// Custom Spinner Component using MUI CircularProgress
const CustomSpinner = () => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <CircularProgress sx={{ color: "#fff" }} />
  </Box>
);

const UserProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch user profile
  const fetchProfile = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/user/${userId}/profile/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setIsFollowing(data.is_following);
      } else {
        toast.error("Error fetching profile.");
      }
    } catch (error) {
      toast.error("Error fetching profile: " + error.message);
    }
  };

  // Fetch user posts
  const fetchPosts = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/user/${userId}/posts/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
      } else {
        toast.error("Error fetching posts.");
      }
    } catch (error) {
      toast.error("Error fetching posts: " + error.message);
    }
  };

  // Handle follow/unfollow action
  const handleFollowToggle = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/user/${userId}/follow/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsFollowing((prev) => !prev);
        toast.success(data.message);
        fetchProfile(); // Refetch to update follower count
      } else {
        toast.error("Error following/unfollowing user");
      }
    } catch (error) {
      toast.error("Error following/unfollowing user: " + error.message);
    }
  };

  // Handle post interactions (like, dislike)
  const handleLike = async (postId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/posts/${postId}/like/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        fetchPosts(); // Refetch to update like count
      } else {
        toast.error("Error liking post");
      }
    } catch (error) {
      toast.error("Error liking post: " + error.message);
    }
  };

  const handleDislike = async (postId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/posts/${postId}/dislike/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        fetchPosts(); // Refetch to update dislike count
      } else {
        toast.error("Error disliking post");
      }
    } catch (error) {
      toast.error("Error disliking post: " + error.message);
    }
  };

  const handleCommentSubmit = async (postId) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!newComment.trim()) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/posts/${postId}/comment/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: newComment }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setNewComment(""); // Clear comment field
        fetchPosts(); // Refetch posts to update comments
      } else {
        toast.error("Error submitting comment");
      }
    } catch (error) {
      toast.error("Error submitting comment: " + error.message);
    }
  };

  // Initial data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProfile();
        await fetchPosts();
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setTimeout(() => {
          setLoading(false); // Delay for 3 seconds before setting loading to false
        }, 3000); // 3000 milliseconds = 3 seconds
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          pt: 10,
          backgroundColor: "black",
          borderRadius: 2,
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CustomSpinner />
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        pt: 10,
        backgroundColor: "black",
        borderRadius: 2,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
        minHeight: "100vh",
      }}
    >
      {/* Profile Info */}
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <Card sx={{ backgroundColor: "#1a1a1a", color: "#fff", borderRadius: 2 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {profile.username}
              </Typography>
              <Typography variant="body1" sx={{ color: "#bbb", mb: 3 }}>
                {profile.email}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Followers
                  </Typography>
                  <Typography variant="body1">{profile.followers_count}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Following
                  </Typography>
                  <Typography variant="body1">{profile.following_count}</Typography>
                </Box>
              </Box>

              {profile.username !== localStorage.getItem("username") && (
                <Button
                  variant="contained"
                  color={isFollowing ? "success" : "primary"}
                  sx={{ mt: 3, fontWeight: "bold", borderRadius: 2, paddingX: 4 }}
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* User Posts */}
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <Grid item xs={12} sm={8}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff", mb: 3 }}>
            User Posts
          </Typography>
          <Grid container spacing={3}>
            {posts.length > 0 ? (
              posts.map((post) => (
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
                    <Paper elevation={3} sx={{ padding: "20px", backgroundColor: "#292929", borderRadius: "10px" }}>
                      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
                        {post.title}
                      </Typography>
                      <Typography sx={{ color: "#bbb", mt: 1 }}>
                        {post.content}
                      </Typography>

                      {/* Post Interaction Buttons */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Box>
                          <IconButton onClick={() => handleLike(post.id)}>
                            <ThumbUpIcon sx={{ color: "#fff" }} />
                          </IconButton>
                          <Typography variant="body2" sx={{ color: "#bbb" }}>
                            {post.like_count}
                          </Typography>
                        </Box>

                        <Box>
                          <IconButton onClick={() => handleDislike(post.id)}>
                            <ThumbDownIcon sx={{ color: "#fff" }} />
                          </IconButton>
                          <Typography variant="body2" sx={{ color: "#bbb" }}>
                            {post.dislike_count}
                          </Typography>
                        </Box>

                        <Box>
                          <IconButton>
                            <CommentIcon sx={{ color: "#fff" }} />
                          </IconButton>
                          <Typography variant="body2" sx={{ color: "#bbb" }}>
                            {post.comment_count}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Comments Section */}
                      <List sx={{ mt: 2 }}>
                        {post.comments && post.comments.length > 0 ? (
                          post.comments.map((comment, index) => (
                            <ListItem key={index}>
                              <ListItemText
                                primary={comment.user.username}
                                secondary={comment.content}
                              />
                            </ListItem>
                          ))
                        ) : (
                          <Typography sx={{ color: "#bbb", fontSize: "14px" }}>
                            No comments yet
                          </Typography>
                        )}
                      </List>

                      {/* Comment Input */}
                      <TextField
                        fullWidth
                        label="Add a comment"
                        variant="outlined"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        sx={{ mt: 2 }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => handleCommentSubmit(post.id)}
                      >
                        Post Comment
                      </Button>
                    </Paper>
                  </motion.div>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" sx={{ color: "#bbb" }}>
                No posts available
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* Toast Notifications */}
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
        theme="dark"
      />
    </Container>
  );
};

export default UserProfile;
