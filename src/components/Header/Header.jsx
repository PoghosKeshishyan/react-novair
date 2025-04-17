import { Logo } from './Logo';
import { Navbar } from './Navbar';
import { ChangeLanguage } from './ChangeLanguage';
import './Header.css';

export function Header() {
    return (
        <header>
            <div className="container">
                <div className="row flex-between">
                    <Logo />

                    <div className="menu flex-between">
                        <Navbar />
                        <ChangeLanguage />
                    </div>
                </div>
            </div>
        </header>
    )
}