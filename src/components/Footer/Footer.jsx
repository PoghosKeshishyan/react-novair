import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer({ footerData }) {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row flex-between">
                    <div className="footer-logo">
                        <img src={footerData.logo.logo} alt="logo-img" />
                        <p>© 2025 All rights reserved</p>
                    </div>

                    <div className="footer-menu">
                        <div className="footer-links">
                            {footerData.urls.links.map((item, index) => (
                                <Link key={index} to={item.url}>{item.title}</Link>
                            ))}
                        </div>

                        <div className="footer-social">
                            {footerData.urls.social.map((item, index) => (
                                <a key={index} href={item.url}>{item.title}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};