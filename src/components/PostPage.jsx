import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '/client';
import Comments from './Comments';

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [upvoted, setUpvoted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedImageUrl, setEditedImageUrl] = useState("");


  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        // Fetch post details
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select('*')
          .eq('id', postId)
          .single();

        setPost(postData);

        // Fetch comments related to the post
        const { data: commentData, error: commentError } = await supabase
          .from('comments')
          .select('*')
          .eq('post_id', postId);

          console.log("id:", comments);
        setComments(commentData || []);                          
        console.log("id:", comments);
      } catch (error) {
        console.error('Error fetching post and comments:', error.message);
        // Handle error, display error message to the user
      }
    };

    fetchPostAndComments();
  }, [postId]);

  const handleUpvote = async () => {
    try {
      // Send a PATCH request to update the upvotes_count in the posts table
      const { data, error } = await supabase
        .from('posts')
        .update({ upvotes_count: post.upvotes_count + 1 })
        .eq('id', postId);

      if (error) {
        throw error;
      }

      console.log('Post upvoted:', data);

      // Update the upvoted state
      setUpvoted(true);

      // Update the upvotes count in the post state
      setPost(prevPost => ({ ...prevPost, upvotes_count: prevPost.upvotes_count + 1 }));
    } catch (error) {
      console.error('Error upvoting post:', error.message);
      // Handle error, display error message to the user
    }
  };

  const handleEdit = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({ title: editedTitle, content: editedContent, image_url: editedImageUrl })
        .eq('id', postId);

      setPost(data);
      setEditMode(false);  // Exit edit mode after update
      window.location.href = '/';
    } catch (error) {
      console.error('Error updating post:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) {
        throw error;
      }

      console.log('Post deleted:', data);
      // Redirect to home page after deletion
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  const onCommentSubmit = (newComment) => {
    window.location.href = "/post/:postId";
    setComments(prevComments => [...prevComments, newComment]);
  };

  const addComments = () => {
    console.log(comments);
    return (
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    );
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        {post.image_url && <img src={post.image_url} alt="Post Image" />}
        <p>Upvote: {post.upvotes_count}</p>
        <button onClick={handleUpvote} disabled={upvoted}>Upvote</button>
        <button onClick={() => setEditMode(true)}>Edit Post</button>
        <button onClick={handleDelete}>Delete Post</button>

        {editMode && (
          <div>
            <input
              type="text"
              value={editedTitle}
              onChange={e => setEditedTitle(e.target.value)}
            />
            <textarea
              value={editedContent}
              onChange={e => setEditedContent(e.target.value)}
            />
            <input
              type="text"
              value={editedImageUrl}
              onChange={e => setEditedImageUrl(e.target.value)}
            />
            <button onClick={handleEdit}>Update Post</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        )}

        <h2>Comments</h2>
        {addComments()}

        {/* Render the Comments component */}
        <Comments postId={postId} onCommentSubmit={onCommentSubmit} addComments={addComments}/>
      </div>
    </>
  );
};

export default PostPage;