import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreatePost from './components/CreatePost';
import PostPage from './components/PostPage';
import './App.css'

function App() {
  return (
    <div className='App'>
      <div className='nav'>
        <h1 className='website-title'>ReadersHub</h1>
        <div className='website-links'>
          <Link to="/">
            <p className='header'>Home</p>
          </Link>
          <Link to="/create">
            <p className='header'>Create New Post</p>
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:postId" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App;