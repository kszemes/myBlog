import {createContext, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import {
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    sendSignInLinkToEmail,
    signOut,
    updateProfile,
    createUserWithEmailAndPassword
} from "firebase/auth";
import {auth} from "../utility/firebaseApp.js";

export const UserContext = createContext();
export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
        return () => unsubscribe();
    }, []);

    const logoutUser = async () => {
        await signOut(auth);
        if (location.pathname == '/create' || location.pathname == '/profile') {
            navigate('/');
        }
    }

    const loginUser = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Successful Login!');
            setMsg({...msg, signin: null});
            navigate('/');
        } catch (e) {
            console.log(e.message);
            setMsg({...msg, signin: e.message});
        }
    }

    const sendEmailLink = async (email) => {
        try {
            await sendSignInLinkToEmail(auth, email, {
                url: "http://localhost:5173/signin",
                handleCodeInApp: true
            });
            alert('Email elküldve+ Kattints a benne lévő linkre!');
        } catch (e) {
            console.log(e.message);
            setMsg({...msg, signup: e.message});
        }
    }

    const signUpUser = async (email, password, displayName) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {displayName});
            await sendEmailLink(email);
            setMsg({...msg, signup: null});
        } catch (e) {
            console.log(e.message);
            setMsg({...msg, signup: e.message});
        }
    }

    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Jelszó módosítás elküldve!')
            navigate('/signin')
            setMsg({...msg, resetpw: null});
        } catch (e) {
            console.log(e.message);
            setMsg({...msg, resetpw: e.message});
        }
    }

    return (
        <UserContext.Provider value={{user, logoutUser, loginUser, signUpUser, resetPassword, msg}}>
            {children}
        </UserContext.Provider>
    )
}