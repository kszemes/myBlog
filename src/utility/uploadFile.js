import {storage} from "./firebaseApp.js";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {v4 as uuidv4} from 'uuid'

export const uploadFile = async (file) =>{
    try {
        const fileRef = ref(storage, `uploads/${uuidv4() + file.name.slice(-4)}`);
        await uploadBytes(fileRef, file);
        return await getDownloadURL(fileRef);
    } catch (e) {
        console.log('Hiba a file feltöltés közben! ',e.message);
        throw e
    }
}

export const uploadAvatar = async (file, userId)=>{
    try {
        const fileRef = ref(storage, `avatars/${userId + file.name.slice(-4)}`);
        await uploadBytes(fileRef, file);
        return await getDownloadURL(fileRef);
    } catch (e) {
        console.log('Hiba a file feltöltés közben! ',e.message);
        throw e
    }
}