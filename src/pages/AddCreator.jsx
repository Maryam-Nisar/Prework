import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './homepage.css';

function AddCreator() {
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
    youtube: '',
    twitter: '',
    instagram: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCreator({ ...creator, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('creators').insert([creator]);
    if (error) {
      console.error('Error adding creator:', error);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="add-creator-form">
      <h1>ADD A CREATOR</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={creator.name} onChange={handleChange} />
        </label>
        <label>
          URL:
          <input type="text" name="url" value={creator.url} onChange={handleChange} />
        </label>
        <label>
          Image URL:
          <input type="text" name="imageURL" value={creator.imageURL} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={creator.description} onChange={handleChange} />
        </label>
        <h2>Social Media Links</h2>
        <p>Provide at least one of the creator's social media links.</p>
        <div className="social-media-links">
          <label>
            <div className="logo-name">
              <img src="https://static-00.iconduck.com/assets.00/youtube-icon-2048x2048-oa03jx3h.png" alt="YouTube" />
              <span className="name">YouTube</span>
            </div>
            <input type="text" name="youtube" value={creator.youtube} onChange={handleChange} />
          </label>
          <label>
            <div className="logo-name">
              <img src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png" alt="Twitter" />
              <span className="name">Twitter</span>
            </div>
            <input type="text" name="twitter" value={creator.twitter} onChange={handleChange} />
          </label>
          <label>
            <div className="logo-name">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
              <span className="name">Instagram</span>
            </div>
            <input type="text" name="instagram" value={creator.instagram} onChange={handleChange} />
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddCreator;
