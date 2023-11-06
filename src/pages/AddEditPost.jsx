import React, {useContext, useEffect, useState} from "react";
import {Form, FormGroup, Label, Row, Col} from 'reactstrap'
import {useForm} from 'react-hook-form';
import {UserContext} from "../context/UserContext";
import {NotFound} from "./NotFound";
import {Loader} from "../components/Loader";
import {uploadFile} from "../utility/uploadFile";
import {addPost, editPost, readPost} from "../utility/crud.js";
import {MyAlert} from "../components/MyAlert";
import {CategContext} from "../context/CategProvider.jsx";
import {Story} from "../components/Story.jsx";
import {useParams} from "react-router-dom";

export const AddEditPost = () => {
    const {user} = useContext(UserContext)
    const {register, handleSubmit, formState: {errors}, setValue} = useForm();
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [uploaded, setUploaded] = useState(false)
    const {categories} = useContext(CategContext)
    const [story, setStory] = useState('');
    const param = useParams();
    const [post, setPost] = useState(null); //Szerkesztéskor kell mehjeleníteni az adatokat

    useEffect(() => {
        if (param?.id) {
            readPost(param.id, setPost)
        }
    }, [param?.id]);

    useEffect(() => {
        if (post && param?.id) {
            setValue('title', post.title);
            setValue('category', post.category);
            setPhoto(post.photoUrl)
        }
    }, [post, param?.id]);

    if (!user) return (<NotFound/>)

    const onSubmit = async (data, e) => {
        e.preventDefault()
        setLoading(true)
        if (param.id) {//update esetén

                try {
                    const newData = {...data}
                    await editPost(param.id, {...newData, description: story});
                    setUploaded(true);
                } catch (e) {
                    console.log('Hiba update esetén: '+e)
                }finally {
                    setLoading(false);
                }

             } else { //új post

        }
        try {
            const file = data.file[0]
            const photoUrl = await uploadFile(file)
            console.log('a feltöltött fájl URLje:', photoUrl);
            const newData = {...data}
            delete newData.file
            await addPost({...newData, photoUrl, author: user.displayName, userId: user.uid, description: story, likes: [], likesCount: 0})
            setUploaded(true)
        } catch (error) {
            console.log('Hiba a fájlfeltöltés során!');
        } finally {
            setLoading(false)
        }
        e.target.reset()
    }

    return (<div className="createBlog">
            <h3>{param?.id ? 'Update' : 'Create'} blog</h3>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Title</Label>
                            <input type="text" {...register('title', {required: true})} className="form-control"/>
                            {errors.title && <p className="errMsg">Title is required!</p>}
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Blog category</Label>
                            <select {...register('category', {
                                required: true, validate: (value => {
                                    if (value == 0) return 'You must choose one category for your post!'
                                })
                            })} className="form-select">
                                <option value="0">select category...</option>
                                {categories.map(ctg => <option key={ctg} value={ctg}>{ctg}</option>)}
                            </select>
                            <p className="errMsg">{errors?.category?.message}</p>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Story story={post?.description} setStory={setStory}/>
                </FormGroup>
                <Row>
                    {!param.id && <Col md={6}>
                        <FormGroup>

                            <input type="file" {...register('file', {
                                required: true, validate: (value) => {
                                    const acceptedFormats = ['jpg', 'png', 'pdf']
                                    const fileExtension = value[0]?.name.split('.').pop().toLowerCase()
                                    if (!acceptedFormats.includes(fileExtension)) return 'Invalid file format!'
                                    if (value[0].size > 1 * 1000 * 1024) return 'Max.file size allowed is 1MB !'
                                    return true
                                }
                            })}
                                   className="form-control"
                                   onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
                            />
                            <p className="errMsg">{errors?.file?.message}</p>
                        </FormGroup>
                    </Col>}
                    <Col md={2}>
                        <input type="submit" className="btn btn-primary"/>
                    </Col>
                    <Col md={2}>
                        {photo && <img src={photo} alt="postPhoto" className="img-thumbnail"/>}
                    </Col>
                </Row>
                {loading && <Loader/>}
                {uploaded && <MyAlert text='Post saved succesfully!'/>}
            </Form>
        </div>);
};