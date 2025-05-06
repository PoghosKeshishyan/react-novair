import { useEffect, useRef, useState } from "react";
import { Dropdown } from "./Dropdown";

export function From({ from, setFrom }) {
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
    } catch { }
  }

  return (
    <div className="From flex-between" ref={dropdownRef} onClick={() => setShowDropdown(true)}>
      <div className="left-side">
        <p className="title">From</p>

        <div className="info flex-center">
          <img src="/images/plane-flight.svg" alt="plane" />
          {from ? <span>Yerevan-Jakarta</span> : <span>Select</span>}
        </div>
      </div>

      <div className="right-side">EVN</div>

      {showDropdown && <Dropdown showDropdown={showDropdown} from={from} setFrom={setFrom} />}
    </div>
  )
}
