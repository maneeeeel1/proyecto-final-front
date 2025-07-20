import React, {createContext, useState, useContext} from "react";

const ThemeContext = createContext();

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () =>{
        setTheme((prevTheme) =>(prevTheme === "light" ? "dark" : "light"));
    };

    const value = {
        theme,
        toggleTheme,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(){
    return useContext(ThemeContext);
}