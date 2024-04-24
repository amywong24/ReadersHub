import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreatePost from './components/CreatePost';
import PostPage from './components/PostPage';

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='nav'>
          <Link to="/">
            <p className='header'>Home</p>
          </Link>
          <Link to="/create">
            <p className='header'>Create New Post</p>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/info/:postId" element={<PostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
