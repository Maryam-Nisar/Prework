// src/pages/EditCreator.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './homepage.css'; // Import updated CSS for styling

function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
    youtube: '',
    twitter: '',
    instagram: ''
  });

  useEffect(() => {
    async function fetchCreator() {
      const { data, error } = await supabase.from('creators').select('*').eq('id', id).single();
      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data);
      }
    }

    fetchCreator();
  }, [id]);

  const handleChange = (e) => {
    setCreator({ ...creator, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('creators').update(creator).eq('id', id);
    if (error) {
      console.error('Error updating creator:', error);
    } else {
      navigate('/');
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from('creators').delete().eq('id', id);
    if (error) {
      console.error('Error deleting creator:', error);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="add-creator-form">
      <h1>Edit Creator</h1>
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
          Description:
          <input type="text" name="description" value={creator.description} onChange={handleChange} />
        </label>
        <label>
          Image URL:
          <input type="text" name="imageURL" value={creator.imageURL} onChange={handleChange} />
        </label>
        <h2>Social Media Links</h2>
        <div className="social-media-links">
          <label>
            <img src="https://static-00.iconduck.com/assets.00/youtube-icon-2048x2048-oa03jx3h.png" alt="YouTube" />
            YouTube:
            <input type="text" name="youtube" value={creator.youtube} onChange={handleChange} />
          </label>
          <label>
            <img src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png" alt="Twitter" />
            Twitter:
            <input type="text" name="twitter" value={creator.twitter} onChange={handleChange} />
          </label>
          <label>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
            Instagram:
            <input type="text" name="instagram" value={creator.instagram} onChange={handleChange} />
          </label>
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={handleDelete} className="delete-button">Delete</button>
      </form>
    </div>
  );
}

export default EditCreator;
