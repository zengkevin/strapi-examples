import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleBanner.css';

function ArticleBanner(props) {
  return (
    <Link to={`/${props.id}`} className="link">
      <div className="banner">
        <img src={`http://localhost:1337${props.cover.url}`} alt={props.cover.name} className="banner-image" />
        <div className="banner-body">
          <h3>{props.title}</h3>
          <p>{props.content_short}</p>
        </div>
      </div>
    </Link>
  )
}

export default ArticleBanner;