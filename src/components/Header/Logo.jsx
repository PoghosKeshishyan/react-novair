import { Link } from "react-router-dom";

export function Logo() {
    return (
        <Link to={'/'} className="logo">
            <img src="images/header/logo.svg" alt="logo" />
        </Link>
    );
}
