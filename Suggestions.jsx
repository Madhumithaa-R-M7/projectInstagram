import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Suggestions() {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/profile')
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error("Error loading profile:", err));

    fetch('http://localhost:3001/Suggestion')
      .then(res => res.json())
      .then(data => setSuggestions(data))
      .catch(err => console.log('Suggestions fetch error:', err));

    fetch('http://localhost:3001/followers')
      .then(res => res.json())
      .then(data => setFollowers(data))
      .catch(err => console.log('Followers fetch error:', err));
  }, []);

  const handleFollow = (user) => {
    axios.post('http://localhost:3001/followers', user)
      .then(() => {
        alert(`Followed ${user.username}`);
        setFollowers(prev => [...prev, user]); // Add to followers list
        setSuggestions(prev => prev.filter(s => s.id !== user.id)); // Remove from suggestions
      })
      .catch(err => console.log('Follow error:', err));
  };

  return (
    <div className='Suggestions w-75 m-4'>
      {/* Profile section */}
      {profile ? (
        <div className="d-flex align-items-center mb-4">
          <img
            className="dp rounded-circle me-2"
            src={profile.profile_pic}
            alt="Profile"
            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
          />
          <p className="m-0 fw-bold">{profile.username}</p>
          <p className='ms-auto text-primary'>Switch</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      {/* Suggestions section */}
      <h6 className='text-muted mb-3'>Suggestions for you</h6>
      {suggestions.length > 0 ? (
        suggestions.map(user => (
          <div key={user.id} className="d-flex align-items-center mb-2">
            <img
              className="dp rounded-circle me-2"
              src={user.profile_pic}
              alt={user.username}
              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
            />
            <p className="m-0 fw-bold">{user.username}</p>
            <button
              className='btn btn-link ms-auto text-primary p-0'
              onClick={() => handleFollow(user)}
            >
              Follow
            </button>
          </div>
        ))
      ) : (
        <p>No more suggestions</p>
      )}
    </div>
  );
}

export default Suggestions;
