import { createContext } from 'react'


export const themes = {
    dark: {
        color: "#d2d5d5",
        backgroundColor: "#1e1f20"
    },
    light: {
        color: "#4a4949",
        backgroundColor: "#fbfcff"
    },

}



const ThemeContext = createContext(themes.dark)

export default ThemeContext;