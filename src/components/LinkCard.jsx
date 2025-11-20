// src/components/LinkCard.jsx
import React from 'react';
import { ExternalLink } from 'lucide-react';
import '../styles/LinkCard.css';

const LinkCard = ({ link }) => {
  return (
    <a 
      href={link.url} 
      className="link-card"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="link-card-content">
        <h3>{link.name}</h3>
        {link.description && <p>{link.description}</p>}
      </div>
      <ExternalLink size={18} className="link-icon" />
    </a>
  );
};

export default LinkCard;
