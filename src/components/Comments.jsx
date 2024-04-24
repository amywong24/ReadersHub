import React, { useState } from 'react';
import { supabase } from '/client';

const Comments = ({ postId, onCommentSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to Supabase to insert a new comment
      const { data, error } = await supabase.from('comments').insert([
        { post_id: postId, content }
      ]);

      if (error) {
        throw error;
      }

      console.log('New comment added:', data[0]);

      // Clear form field after successful submission
      setContent('');

      // Call the callback function passed from the parent component
      if (onCommentSubmit) {
        onCommentSubmit();
      }
    } catch (error) {
      console.error('Error adding new comment:', error.message);
      // Handle error, display error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your comment here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default Comments;