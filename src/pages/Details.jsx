import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {deleteFile, deletePost, editLikes, readPost} from "../utility/crud.js";
import parse from "html-react-parser";
import {FaPen, FaThumbsUp, FaTrash} from "react-icons/fa6";
import {UserContext} from "../context/UserContext.jsx";
import {useConfirm} from "material-ui-confirm";
import {MyAlert} from "../components/MyAlert.jsx";
import './Details.css'

export const Details = () => {

    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const params = useParams();
    const confirm = useConfirm();

    const [msg, setMsg] = useState('');
    const [likes, setLikes] = useState(null);

    useEffect(() => {
        readPost(params.id, setPost, setLikes)
        setLikes()
    }, []);
    const handleDelete = async () => {
        try {
            await confirm({
                description: 'Ez egy visszafordíthatatlan művelet!',
                confirmationText: 'Igen',
                cancellationText: 'Mégsem',
                title: 'Biztosan ki szeretné törölni ezt a blogot?'
            })
            console.log('Igenre kattintott!')
            const result = await deleteFile(post?.photoUrl);
            if (result) {
                await deletePost(post.id);
                navigate('/')
            } else {
                console.log('File törlés nem sikerült!');
            }
        } catch (e) {
            console.log('mégsem....')
        }
    }

    const handleLikes = async () => {
        if (user) {
            const likeCount = await editLikes(params.id, user.uid);
            setLikes(likeCount)
        } else {
            setMsg('Bejelentkezés szükséges!');
        }
    }

    return (
        <div className='container p-3 details'>
            <div className='img-container'>
                {post && <img src={post?.photoUrl} alt={post?.title} className='imgage'/>}
            </div>
            <h3 className='text-center'>{post?.title}</h3>
            <p>{post?.author}</p>
            {post && <p>{parse(post?.description)}</p>}
            <div className='d-flex justify-content-between'>
                <div className=''>
                    <FaThumbsUp className='text-primary' onClick={handleLikes}/>
                    <span>{likes}</span>
                </div>
                {user && <div>
                    <FaPen className='text-primary' onClick={() => navigate('/update/' + post.id)}/>
                    <FaTrash className='text-danger me-2' onClick={handleDelete}/>
                </div>}
            </div>
            {msg && <MyAlert text={msg}/>}
            <div className='d-flex justify-content-center'>
                <button className='btn btn-light' onClick={() => navigate('/')}>Vissza...</button>
            </div>
        </div>
    )
}