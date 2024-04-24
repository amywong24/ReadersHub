import React, {useState, useEffect} from 'react';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] =useState("created_at");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = async () => {
    try {
      let query = supabase.from("posts").select("*");

      // Apply sorting
      if (sortBy === "created_at") {
        query = query.order("created_at", { ascending: false });
      } else if (sortBy === "upvotes_count") {
        query = query.order("upvotes_count", { ascending: false });
      }

      // Apply search
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%, content.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      // Handle error, display error message to the user
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    fetchPosts();
  }, [sortBy, searchQuery]); // Fetch posts whenever sortBy or searchQuery changes

  return (
    <div>
      <h1>Home Feed</h1>
      {/* Render sort and search controls */}
      <div>
        <label htmlFor="sortBy">Sort By:</label>
        <select id="sortBy" value={sortBy} onChange={handleSortChange}>
          <option value="created_at">Created At</option>
          <option value="upvotes_count">Upvotes Count</option>
        </select>
      </div>
      <div>
        <label htmlFor="searchQuery">Search:</label>
        <input
          type="text"
          id="searchQuery"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by title or content"
        />
      </div>
      {/* Render posts */}
      {posts.map((post) => (
        <div key={post.id}>
          <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>Created at: {new Date(post.created_at).toLocaleString()}</p>
          <p>Upvotes: {post.upvotes_count}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default HomePage;