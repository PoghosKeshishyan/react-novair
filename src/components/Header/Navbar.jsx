import { useState } from "react";
import { NavLink } from "react-router-dom";

export function Navbar({ navbar }) {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleMouseEnter = (index) => {
        setActiveDropdown(index);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    return (
        <ul className="navbar flex-between">
            {
                navbar.map((elem, index) => (
                    <li
                        key={elem.id}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <p className="nav-link">{elem.title}</p>

                        {
                            activeDropdown === index && (
                                <ul className={`sub-menu ${index === 1 ? 'sub-menu-2' : ''}`}>
                                    {
                                        elem.subnavbar_list.map(sub_elem => (
                                            <li key={sub_elem.id}>
                                                <NavLink to={sub_elem.url} className="sub-menu-link">
                                                    {sub_elem.title}
                                                </NavLink>
                                            </li>
                                        ))
                                    }
                                </ul>
                            )
                        }
                    </li>
                ))
            }
        </ul>
    );
}