import {createContext, useEffect, useState} from "react";
export const postCategories = ['Sport', 'Food', 'Health', 'Culture', 'Travel']
export const CategContext = createContext();

export const CategProvider = ({children}) => {
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        setCategories(postCategories)
    }, []);
    return (
        <CategContext.Provider value={{categories}}>
            {children}
        </CategContext.Provider>
    )
}