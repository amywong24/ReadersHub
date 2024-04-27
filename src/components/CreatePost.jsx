import React, { useState } from "react";
import { supabase } from '/client';
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted'); // Add this line

    try {
      // Send a POST request to Supabase to insert a new row
      const { data, error } = await supabase.from('posts').insert([
        { title, content, image_url: imageUrl }
      ]);

      // Clear form fields after successful submission
      setTitle('');
      setContent('');
      setImageUrl('');

      // Navigate to the home page
      navigate('/');
    } catch (error) {
      console.error('Error adding new post:', error.message);
      // Handle error, display error message to the user
    }
  };

  return (
    <div>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;