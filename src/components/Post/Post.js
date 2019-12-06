import React from 'react';
import { Link } from 'react-router-dom';

import './Post.css';

const post = (props) => {
    const linkTo = '/posts/' + props.id;

    return (    
        <article className="Post">        
        <Link to={linkTo}>
            <h1>{props.title}</h1>
        </Link>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
        </article>   
    );
}

export default post;