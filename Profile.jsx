import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    // Fetch profile
    axios.get('http://localhost:3001/profile')
      .then(res => setProfile(res.data))
      .catch(err => console.log('Profile Error:', err));

    // Fetch followers
    axios.get('http://localhost:3001/followers')
      .then(res => setFollowers(res.data))
      .catch(err => console.log('Followers Error:', err));
  }, []);

  const handleOnChange = (e) => {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = () => {
    axios.put('http://localhost:3001/profile', profile)
      .then(() => console.log("Updated"))
      .catch(err => console.log(err));
  };

  const handleUnfollow = async (id) => {
    axios.delete(`http://localhost:3001/followers/${id}`)
      .then(() => {
        alert("Unfollowed");
        setFollowers(prev => prev.filter(f => f.id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='m-5'>
      {profile ? (
        <div>
          <img
            src={profile.profile_pic}
            alt="Profile"
            className='profile rounded-circle mb-3'
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
          <h5>{profile.username}</h5>
          <p className='text-muted'>{followers.length} followers</p>

          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleOnChange}
            className='form-control my-3'
          />

          <input
            type="text"
            name="profile_pic"
            value={profile.profile_pic}
            onChange={handleOnChange}
            className='form-control'
          />

          <button className="btn btn-primary my-4" onClick={handleUpdate}>
            Update
          </button>
        </div>
      ) : (
        <div>Loading profile...</div>
      )}

      <div className="mt-4">
        <h6>Followers</h6>
        {followers.length > 0 ? (
          followers.map(user => (
            <div key={user.id} className="d-flex align-items-center mb-2">
              <img
                src={user.profile_pic}
                alt={user.username}
                className="rounded-circle me-2"
                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
              />
              <p className="m-0">{user.username}</p>
              <button
                className="btn btn-outline-danger btn-sm ms-auto"
                onClick={() => handleUnfollow(user.id)}
              >
                Unfollow
              </button>
            </div>
          ))
        ) : (
          <p className='text-muted'>No followers yet.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
