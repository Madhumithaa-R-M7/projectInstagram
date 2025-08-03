import React, { useEffect, useState } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/posts')
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setPosts(data);
      })
      .catch((err) => console.log("Fetch error:", err));
  }, []);

  return (
    <div className="d-flex justify-content-center">
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <div className="my-4 p-3 border rounded" key={post.id} style={{ width: '400px' }}>
              
              {/* Profile row */}
              <div className="d-flex align-items-center mb-2">
                <img
                  className="dp rounded-circle me-2"
                  src={post.user.profile_pic}
                  alt="Profile"
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
                <p className="m-0 fw-bold">{post.user.username}</p>
              </div>

              {/* Post Image */}
              <div>
                <img
                  className="image w-100 mb-2"
                  src={post.image}
                  alt="Post"
                  style={{ borderRadius: '10px' }}
                />
              </div>

              {/* Action icons */}
              <div className="mb-2">
                <i className="bi bi-heart me-3"></i>
                <i className="bi bi-chat me-3"></i>
                <i className="bi bi-send"></i>
              </div>

              {/* Caption, likes, comments */}
              <div>
                <p className="m-0 fw-bold">{post.likes} likes</p>
                <p>{post.caption}</p>
                {post.comments.map((comment, index) => (
                  <p key={index} className="mb-1">
                    <strong>{comment.user}:</strong> {comment.comment}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading Posts...</div>
      )}
    </div>
  );
}

export default Posts;
