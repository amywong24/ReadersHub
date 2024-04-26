import React, { useState } from 'react';
import { supabase } from '/client';

const Comments = ({ postId, onCommentSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const { data, error } = await supabase.from('comments').insert([
        { post_id: postId, content }
      ]);
  
      if (error) {
        throw error;
      }
  
      if (data && data.length > 0) {
        console.log('New comment added:', data[0]);
        setContent('');
  
        // Call the callback function passed from the parent component
        if (onCommentSubmit) {
          onCommentSubmit(data[0]); // Pass the new comment back to the parent
        }
      } else {
        throw new Error("No data returned after inserting comment");
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