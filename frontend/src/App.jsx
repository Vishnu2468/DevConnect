import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import PostsList from './components/PostsList';
import UserPosts from './components/UserPost';
import AddPost from './components/AddPost';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';
// import UserList from './components/UserList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const handleRedirect = (status) => {
    setIsLoggedIn(status);
    if (!status) {
      localStorage.removeItem('accessToken');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login onLogin={handleRedirect} />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route
          path="/home"
          element={isLoggedIn ? <Home onSignOut={handleRedirect} /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile onSignOut={handleRedirect} /> : <Navigate to="/" />}
        />
        <Route
          path="/posts"
          element={isLoggedIn ? <PostsList onSignOut={handleRedirect} /> : <Navigate to="/" />}
        />
        <Route
          path="/user-post"
          element={isLoggedIn ? <UserPosts onSignOut={handleRedirect} /> : <Navigate to="/" />}
        />
        <Route
          path="/add-post"
          element={isLoggedIn ? <AddPost onSignOut={handleRedirect} /> : <Navigate to="/" />}
        />
        <Route
          path="/user/:userId"
          element={isLoggedIn ? <UserProfile/> : <Navigate to="/" />}
        />
        {/* <Route path="/Users_Profile/:authorId" element={<UserProfile />} />  */}
        {/* <Route
          path="/users"
          element={isLoggedIn ? <UserList /> : <Navigate to="/" />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
