import {db, storage} from "./firebaseApp.js"
import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    where,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    arrayUnion,
    arrayRemove,
    limit
} from "firebase/firestore"
import {ref, deleteObject} from "firebase/storage";

export const addPost = async (formData) => {
    const collectionRef = collection(db, 'post');
    const newItem = {...formData, timeStamp: serverTimestamp()};
    const newDocRef = await addDoc(collectionRef, newItem);
}
export const readPosts = async (setPosts, selectedCategories) => {
    const collectionRef = collection(db, 'post');
    const q = (selectedCategories.length == 0 ?
            query(collectionRef, orderBy('timeStamp', 'desc')) :
            query(collectionRef, where('category', 'in', selectedCategories))
    )
    return onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs.map(doc => (
                {...doc.data(), id: doc.id}
            )
        ))
    });
}
export const readPost = async (id, setPost, setLikes) => {
    const docRef = doc(db, "post", id);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setPost({...docSnap.data(), id: docSnap.id})
            setLikes && setLikes(docSnap.data().likes.length);
        } else {
            console.log('Nincs ilyen Documentum az alábbi ID-vel: ' + id)
        }
    } catch (e) {
        console.log('Hiba a Post olvasásnál! ' + e);
    }
}
export const editPost = async (id, {title, category, description}) => {
    const docRef = doc(db, "post", id);
    await updateDoc(docRef, {title, category, description})
}
export const deleteFile = async (url) => {
    const fileRef = ref(storage, url);
    try {
        await deleteObject(fileRef);
        return true;
    } catch (e) {
        console.log('deleteFile: Error deleting file: ' + e)
        return false;
    }
}
export const deletePost = async (id) => {
    const docRef = doc(db, "post", id);
    await deleteDoc(docRef);
}
export const editLikes = async (postId, userId) => {
    const docRef = doc(db, "post", postId);
    const docSnap = await getDoc(docRef);
    let likesCount = docSnap.data().likes.length;
    if (docSnap.data().likes.indexOf(userId) === -1) {
        likesCount++;
        await updateDoc(docRef, {likes: arrayUnion(userId), likesCount})
    } else {
        likesCount--;
        await updateDoc(docRef, {likes: arrayRemove(userId), likesCount})
    }
    return likesCount;
}

export const popularPosts = (setPosts) => {
    const collectionRef = collection(db, 'post');
    const q = query(collectionRef, orderBy('likesCount', 'desc'), limit(3));
    return onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs.map(doc => (
                {...doc.data(), id: doc.id}
            )
        ))
    });
}