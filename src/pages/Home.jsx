import {Categories} from "../components/Categories.jsx";
import {Posts} from "../components/Posts.jsx";
import React, {useState} from "react";
import  './Home.css'
import {PopularPosts} from "../components/PopularPosts.jsx";
export const Home = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    return (
        <div className='home'>
            <div className='categ shadow'>
                <Categories selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
                <PopularPostMemoized/>
            </div>
            <div className='posts'>
                <Posts selectedCategories={selectedCategories}/>
            </div>
        </div>
    )
}

//memoizálás: A PopularPosts nem fog újra renderelődni a Category választáskor

const PopularPostMemoized = React.memo(PopularPosts);