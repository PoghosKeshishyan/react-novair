import { createContext, useState } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [currentLang, setCurrentLang] = useState(() => {
        return localStorage.getItem('lang') || 'en';
    });

    const changeLanguage = (code) => {
        setCurrentLang(code);
        localStorage.setItem('lang', code);
    };

    return (
        <LanguageContext.Provider value={{ currentLang, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}