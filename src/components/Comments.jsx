import React, { useState } from 'react';
import { supabase } from '/client';

const Comments = ({ postId, onCommentSubmit, addComments }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase.from('comments').insert([
        { post_id: postId, content }
      ]);

      if (data && data.length > 0) {
        console.log('New comment added:', data);
        setContent('');

        // Call the callback function passed from the parent component
        if (onCommentSubmit) {
          onCommentSubmit(data[0]); // Pass the new comment back to the parent
        }
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
      <button type="submit" onClick={addComments}>Submit Comment</button>
    </form>
  );
};

export default Comments;