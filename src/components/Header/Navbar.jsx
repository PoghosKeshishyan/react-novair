import { useState } from "react";

export function Navbar() {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleMouseEnter = (index) => {
        setActiveDropdown(index);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    return (
        <ul className="navbar flex-between">
            <li
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
            >
                <a href="#" className="nav-link">Services</a>

                {activeDropdown === 1 && (
                    <ul className="sub-menu">
                        <li><a href="#" className="sub-menu-link">Buy a ticket</a></li>
                        <li><a href="#" className="sub-menu-link">Online-registration</a></li>
                        <li><a href="#" className="sub-menu-link">Seat choice</a></li>
                        <li><a href="#" className="sub-menu-link">Extra-baggage</a></li>
                    </ul>
                )}
            </li>

            <li
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
            >
                <a href="#" className="nav-link">Information</a>

                {activeDropdown === 2 && (
                    <ul className="sub-menu">
                        <li><a href="#" className="sub-menu-link">Passengers and baggage transportation conditions</a></li>
                        <li><a href="#" className="sub-menu-link">Fares</a></li>
                        <li><a href="#" className="sub-menu-link">Legal information</a></li>
                        <li><a href="#" className="sub-menu-link">Passenger transportation</a></li>
                        <li><a href="#" className="sub-menu-link">Baggage</a></li>
                        <li><a href="#" className="sub-menu-link">Pets transportation</a></li>
                        <li><a href="#" className="sub-menu-link">Flight of children/ pregnant women</a></li>
                        <li><a href="#" className="sub-menu-link">Passengers with disabilities</a></li>
                    </ul>
                )}
            </li>

            <li
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave}
            >
                <a href="#" className="nav-link">About Company</a>

                {activeDropdown === 3 && (
                    <ul className="sub-menu">
                        <li><a href="#" className="sub-menu-link">About us</a></li>
                        <li><a href="#" className="sub-menu-link">Contacts</a></li>
                    </ul>
                )}
            </li>
        </ul>
    );
}