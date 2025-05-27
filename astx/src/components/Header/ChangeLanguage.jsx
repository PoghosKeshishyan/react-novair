import { useState } from "react";

export default function ChangeLanguage() {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="change-language"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)} >
            

            <div className="current-lang flex-between">
                <img src="images/header/flag-en.svg" alt="flag-en" />
                <p>English</p>
                <img src="images/header/lang-arrow.svg" alt="lang-arrow" />
            </div>

            {showDropdown && (
                <div className="sub-menu">
                    <div className="lang flex-between">
                        <img src="images/header/flag-am.svg" alt="flag-am" />
                        <p>Հայերեն</p>
                    </div>

                    <div className="lang flex-between">
                        <img src="images/header/flag-ru.svg" alt="flag-ru" />
                        <p>Русский</p>
                    </div>
                </div>
            )}
        </div>
    );
}
