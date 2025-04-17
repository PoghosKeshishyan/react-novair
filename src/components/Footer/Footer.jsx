import { Link } from "react-router-dom";
import "./Footer.css";

const footerData = {
    links: [
        { title: "About", url: "#" },
        { title: "Terms & Conditions", url: "#" },
        { title: "Privacy Policy", url: "#" },
    ],
    social: [
        { title: "Instagram", url: "#" },
        { title: "Facebook", url: "#" },
        { title: "Twitter", url: "#" },
    ],
};

export function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row flex-between">
                    <div className="footer-logo">
                        <img src="/images/header/logo.svg" alt="logo-img" />
                        <p>© 2025 All rights reserved</p>
                    </div>

                    <div className="footer-menu">
                        <div className="footer-links">
                            {footerData.links.map((item, index) => (
                                <Link key={index} to={item.url}>{item.title}</Link>
                            ))}
                        </div>

                        <div className="footer-social">
                            {footerData.social.map((item, index) => (
                                <a key={index} href={item.url}>{item.title}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
