// src/pages/ShowCreators.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';
import { Link } from 'react-router-dom';
import './homepage.css';

function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase.from('creators').select('*');
      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data);
      }
    }

    fetchCreators();
  }, []);

  return (
    <div className="show-creators">
      <h1>CREATORVERSE</h1>
      <div className="button-container">
        <Link to="/add" className="button add-creator-link">ADD A CREATOR</Link>
        <button onClick={() => setShowAll(!showAll)} className="button view-all-button">
          {showAll ? 'HIDE ALL CREATORS' : 'VIEW ALL CREATORS'}
        </button>
      </div>




      {showAll && (
        <div className="creator-list">
          {creators.length > 0 ? (
            creators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))
          ) : (
            <p>No content creators found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ShowCreators;