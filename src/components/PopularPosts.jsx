import React from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import {popularPosts} from '../utility/crud.js'
import {useNavigate} from "react-router-dom";

export const PopularPosts = () => {
    const [posts, setPosts] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        popularPosts(setPosts)
    }, [])
    console.log('Popular Posts renderelődik')
    //console.table(posts);
    return (
        <div className='mt-3 d-flex flex-column gap-2 align-items-center'>
            <h6 className='border-bottom'>Popular posts</h6>
            {posts && posts.map(obj => <div key={obj.id} className='btn btn-outline-secondary'
            onClick={()=> navigate(('/detail/'+obj.id))}
            >{obj.title} - {obj.likesCount}</div>)}
        </div>
    )
}