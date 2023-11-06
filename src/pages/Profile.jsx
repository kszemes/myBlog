import React, {useContext, useEffect, useState} from "react";
import {Form, FormGroup, Label, Row, Col} from 'reactstrap'
import {useForm} from 'react-hook-form';
import {UserContext} from "../context/UserContext";
import {NotFound} from "./NotFound";
import {Loader} from "../components/Loader";
import {MyAlert} from "../components/MyAlert";
import {useParams} from "react-router-dom";
import {uploadAvatar} from "../utility/uploadFile.js";

export const Profile = () => {
    const {user} = useContext(UserContext)
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [uploaded, setUploaded] = useState(false)
    const param = useParams();

    if (!user) return (<NotFound/>)

    const onSubmit = async (data, e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const file = data.file[0]
            const photoUrl = await uploadAvatar(file, user.uid)
            console.log('a feltöltött fájl URLje:', photoUrl);

            setUploaded(true)
        } catch (error) {
            console.log('Hiba a fájlfeltöltés során!');
        } finally {
            setLoading(false)
        }
        e.target.reset()
    }

    return (<div className="createBlog">
        <h3>User Profile</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                {!param.id && <Col md={6}>
                    <FormGroup>
                        <Label>Avatár</Label>
                        <input type="file" {...register('file', {
                            required: true, validate: (value) => {
                                const acceptedFormats = ['jpg', 'png']
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
            {uploaded && <MyAlert text='Avatar saved succesfully!'/>}
        </Form>
        <button className='btn btn-danger m-2'>Delete User Account</button>
    </div>);
};