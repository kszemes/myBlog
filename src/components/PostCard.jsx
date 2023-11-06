import React from 'react';
import {elapsedTime} from "../utility/elapsedTime.js";
import {truncatesStory} from "../utility/htmlSanitizer.js";
import {useNavigate} from "react-router-dom";
import {FaThumbsUp} from "react-icons/fa6";

export const PostCard = ({category, photoUrl, title, author, description, timeStamp, id, likes}) => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="card mb-3" style={{maxWidth: '100%'}}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={photoUrl} className="img-fluid rounded-start" alt={title}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className='d-flex justify-content-between'>
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">{category}</p>
                            </div>
                            <p className="card-text">
                                {truncatesStory(description, 250)}
                                <span className='span-details' onClick={() => navigate(('detail/' + id))}>...részletek...</span>
                            </p>
                            <div className='d-flex justify-content-between'>
                                <p className="card-text">
                                    <small className="text-muted">{elapsedTime(timeStamp)}</small>
                                </p>
                                <p className="card-subtitle">
                                    <small className="text-muted">{author}</small>
                                </p>
                                <p>
                                    <FaThumbsUp/>{likes?.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};