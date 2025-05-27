import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";

export default function To() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutSide);
  }, []);

  const handleClickOutSide = (e) => {
    try {
      if (!dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    } catch{}
  }

  return (
    <div className="To flex-between" ref={dropdownRef} onClick={() => setShowDropdown(true)}>
      <div className="left-side">
        <p className="title">To</p>

        <div className="info flex-center">
          <img src="/images/bookingSearch/plane-arrive.svg" alt="plane" />
          <span>Jakarta-Indonesia</span>
        </div>
      </div>

      <div className="right-side">JKT</div>

      {showDropdown && <Dropdown showDropdown={showDropdown} />}
    </div>
  )
}