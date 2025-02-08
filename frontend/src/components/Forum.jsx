import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/forum');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching forum posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const styles = {
    homeIcon: {
      cursor: 'pointer',
      width: '80px', // Set an appropriate size for the icon
      height: '50px'
  },
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden" style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
    }}>
      <div className="p-4 bg-white bg-opacity-1000 backdrop-blur-md shadow-md">
      <img src="/public/finalLogo.png" style={styles.homeIcon} alt="Home" onClick={() => window.location.href = '/dashboard'} />
      {/* <button onClick={() => navigate('/dashboard')} className="text-green-600 hover:text-green-800 font-semibold">Home</button> */}
      </div>
      <div className="flex-grow p-6 overflow-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Subject</th>
              <th scope="col" className="px-6 py-3">Author</th>
              <th scope="col" className="px-6 py-3">Replies</th>
              <th scope="col" className="px-6 py-3">Views</th>
              <th scope="col" className="px-6 py-3">Last Post</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {post.subject}
                </th>
                <td className="px-6 py-4">
                  {post.author}
                </td>
                <td className="px-6 py-4">
                  {post.replies}
                </td>
                <td className="px-6 py-4">
                  {post.views}
                </td>
                <td className="px-6 py-4">
                  {post.lastPost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ForumPage;