
export default function Navbar() {
    return (
        <ul className="navbar flex-between">
            <li>
                <a href="#" className="nav-link">Services</a>

                <ul className="sub-menu">
                    <li><a href="#" className="sub-menu-link">Buy a ticket</a></li>
                    <li><a href="#" className="sub-menu-link">Online-registration</a></li>
                    <li><a href="#" className="sub-menu-link">Seat choice</a></li>
                    <li><a href="#" className="sub-menu-link">Extra-baggage</a></li>
                </ul>
            </li>

            <li>
                <a href="#" className="nav-link">Information</a>

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
            </li>

            <li>
                <a href="#" className="nav-link">About Company</a>

                <ul className="sub-menu">
                    <li><a href="#" className="sub-menu-link">About us</a></li>
                    <li><a href="#" className="sub-menu-link">Contacts</a></li>
                </ul>
            </li>

        </ul>
    );
}
