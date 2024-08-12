import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './homepage.css'; // Ensure this path is correct

function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase.from('creators').select('*').eq('id', id).single();
      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data);
      }
    };

    fetchCreator();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this creator?')) {
      const { error } = await supabase.from('creators').delete().eq('id', id);
      if (error) {
        console.error('Error deleting creator:', error);
      } else {
        alert('Creator deleted successfully.');
        navigate('/'); // Redirect to home page or creators list after deletion
      }
    }
  };

  if (!creator) return <div>Loading...</div>;

  return (
    <div className="view-creator">
      <h1>Creatorverse</h1>
      <div className="creator-details">
        <div 
          className="creator-image" 
          style={{ backgroundImage: `url(${creator.imageURL})` }}
        ></div>
        <h2 className="creator-name">{creator.name}</h2>
        <p className="creator-description">{creator.description}</p>
        <div className="social-media-links">
          {creator.youtube && (
            <a href={creator.youtube} target="_blank" rel="noopener noreferrer">
              <img src="https://static-00.iconduck.com/assets.00/youtube-icon-2048x2048-oa03jx3h.png" alt="YouTube" />
              YouTube
            </a>
          )}
          {creator.twitter && (
            <a href={creator.twitter} target="_blank" rel="noopener noreferrer">
              <img src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png" alt="Twitter" />
              Twitter
            </a>
          )}
          {creator.instagram && (
            <a href={creator.instagram} target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
              Instagram
            </a>
          )}
        </div>
        <div className="actions">
          <Link to={`/edit/${creator.id}`} className="button">Edit</Link>
          <button className="button delete-button" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ViewCreator;
