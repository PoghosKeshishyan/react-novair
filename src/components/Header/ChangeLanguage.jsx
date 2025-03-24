import React from 'react'

export default function ChangeLanguage() {
    return (
        <div className="change-language">

            <div className="current-lang flex-between">
                <img src="images/header/flag-en.svg" alt="flag-en" />
                <p>English</p>
                <img src="images/header/lang-arrow.svg" alt="lang-arrow" />
            </div>

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

        </div>
    )
}
