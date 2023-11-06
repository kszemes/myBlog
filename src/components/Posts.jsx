import React, {useEffect, useState} from 'react';
import {readPosts} from "../utility/crud.js";
import {PostCard} from "./PostCard.jsx";

export const Posts = ({selectedCategories}) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        readPosts(setPosts, selectedCategories);
    }, [selectedCategories]);
    return (
        <div>
            <h2>Daily blogs</h2>
            <br/>
            {posts.map(obj => (<PostCard key={obj.id} {...obj}/>))}
        </div>
    );
};