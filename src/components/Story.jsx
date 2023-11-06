import React, {useState} from 'react';
import {Tiptap} from "./TipTap.jsx";

export const Story = ({story, setStory}) => {

    return (
        <div >
            <Tiptap story={story} setStory={setStory}/>
        </div>
    )

};