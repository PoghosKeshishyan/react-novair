import { Logo } from './Logo';
import { Navbar } from './Navbar';
import { ChangeLanguage } from './ChangeLanguage';
import './Header.css';

export function Header({ headerData }) {
    return (
        <header>
            <div className="container">
                <div className="row flex-between">
                    <Logo logo={headerData.logo} />

                    <div className="menu flex-between">
                        <Navbar navbar={headerData.navbar} />
                        <ChangeLanguage languages={headerData.languages} />
                    </div>
                </div>
            </div>
        </header>
    )
}