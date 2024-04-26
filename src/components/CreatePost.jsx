import React, {useState} from "react";
import {supabase} from '/client';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
          // Send a POST request to Supabase to insert a new row
          const { data, error } = await supabase.from('posts').insert([
            { title, content, image_url: imageUrl }
          ]);
    
          if (error) {
            throw error;
          }
    
          console.log('New post added:', data[0]);
          
          // Clear form fields after successful submission
          setTitle('');
          setContent('');
          setImageUrl('');

          window.location = "/";
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