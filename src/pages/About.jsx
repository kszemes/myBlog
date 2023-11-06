import {useState} from "react";
import {Story} from "../components/Story.jsx";

export const About = () => {

    const [story, setStory] = useState('');
    console.log(story)

    return (
        <div className='about'>
            <h1>About</h1>
            <Story story={story} setStory={setStory}/>
        </div>
    )
}