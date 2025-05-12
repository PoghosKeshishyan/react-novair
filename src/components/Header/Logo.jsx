import { Link } from "react-router-dom";

export function Logo({ logo }) {
    return (
        <Link to={'/'} className="logo">
            <img src={logo.logo} alt="logo" />
        </Link>
    );
}
