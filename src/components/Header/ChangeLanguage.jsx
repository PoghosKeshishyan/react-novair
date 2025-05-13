import { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";

export function ChangeLanguage({ languages }) {
    const { changeLanguage, currentLang } = useContext(LanguageContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const selectedLang = languages.find(lang => lang.code === currentLang) || languages[0];

    const handleLanguageChange = (langCode) => {
        changeLanguage(langCode);
        setShowDropdown(false);
    };

    return (
        <div
            className="change-language"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
        >
            <div className="current-lang flex-center">
                <img src={selectedLang.image} alt={`flag-${selectedLang.code}`} />
                <p>{selectedLang.title}</p>
                <img src="images/lang-arrow.svg" alt="lang-arrow" />
            </div>

            {showDropdown && (
                <div className="sub-menu">
                    {languages
                        .filter(lang => lang.code !== selectedLang.code)
                        .map((lang) => (
                            <div
                                key={lang.id}
                                className="lang flex-center"
                                onClick={() => handleLanguageChange(lang.code)}
                            >
                                <img src={lang.image} alt={`flag-${lang.code}`} />
                                <p>{lang.title}</p>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}