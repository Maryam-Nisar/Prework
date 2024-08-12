// src/components/CreatorCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CreatorCard.css'; // Import CSS for styling

function CreatorCard({ creator }) {
  return (
    <div className="creator-card" style={{ backgroundImage: `url(${creator.imageURL})` }}>
      <div className="card-content">
        <h2 className="creator-name">{creator.name}</h2>
        <p className="creator-description">{creator.description}</p>
        
        <div className="card-buttons">
        <Link to={`/edit/${creator.id}`} className="edit-link">
          <i className="fas fa-edit"></i> Edit
        </Link>
        <Link to={`/view/${creator.id}`} className="view-details-link">
          <i className="fas fa-eye"></i> View Details
        </Link>
      </div>
      </div>
    </div>
  );
}

export default CreatorCard;
