import React, {useState} from 'react';
import { createContext } from 'react'

export const UseStateContext = createContext({})

const UseStateProvider = ({ children }) => {
    const [genre, setGenre] = useState(localStorage.getItem('genre'));
    
    return  (
        <UseStateContext.Provider value={{ genre, setGenre }} >
            { children }
        </UseStateContext.Provider>
    )
}



export default UseStateProvider