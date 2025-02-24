import { useLayoutEffect, useState } from "react";

const isLightTheme = window?.matchMedia('(prefers-color-scheme: light)').matches;

const defaultTheme = isLightTheme ? 'light' : 'dark';

export const useThemeMode = ()=> {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || defaultTheme);

    useLayoutEffect(()=>{
        document.body.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme]);

    return { theme, setTheme };
}