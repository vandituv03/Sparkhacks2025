import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/forum");
      console.log("Fetched Posts:", response.data);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching forum posts:", error);
    }
  };

  const handleCreatePost = async () => {
    if (!email || !title || !description) {
      setError("Email, Title, and Description are required!");
      return;
    }

    try {
      const postData = {
        email,
        title,
        desc: description,
      };

      console.log("Sending Post Data:", postData); // Debugging log

      const response = await axios.post("http://127.0.0.1:5000/forum", postData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        alert("Post created successfully!");
        setTitle("");
        setDescription("");
        setEmail(""); // Reset email after post creation
        setShowModal(false);
        fetchPosts(); // Refresh forum posts
      }
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error.message);
      setError("Failed to create post");
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden" style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
    }}>
      {/* Header with Logo */}
      <div className="p-4 bg-white shadow-md">
        <img 
          src="/public/finalLogo.png" 
          alt="Home" 
          className="cursor-pointer w-20 h-10"
          onClick={() => window.location.href = '/dashboard'}
        />
      </div>

      {/* Create Post Button */}
      {/* <div className="p-6">
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          + Create Post
        </button>
      </div> */}

      {/* Forum Table */}
      <div className="flex-grow p-6 overflow-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Author</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900">{post.title}</th>
                <td className="px-6 py-4">{post.desc}</td>
                <td className="px-6 py-4">{post.fname} {post.lname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Creating Post */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-3">Create New Post</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-3"
              required
            />
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-3"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-3"
              required
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setShowModal(false)} 
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreatePost} 
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumPage;