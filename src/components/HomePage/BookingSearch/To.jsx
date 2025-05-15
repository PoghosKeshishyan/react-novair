import { useEffect, useRef, useState } from "react";
import { ToDropdown } from "./ToDropdown";

export function To({ bookingPostData, to_directions, bookingFields, onChangeBookingPostData }) {
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
    <div className="To flex-between" ref={dropdownRef} onClick={() => setShowDropdown(true)}>
      <div className="left-side">
        <p className="title">{bookingFields.to_field_text}</p>

        <div className="info flex-center">
          <img src="/images/plane-arrive.svg" alt="plane" />
          <span>{bookingPostData.to_there || bookingFields.select_field_text}</span>
        </div>
      </div>

      <div className="right-side">{bookingPostData.arrival_airport_short_name}</div>

      {showDropdown && (
        <ToDropdown
          showDropdown={showDropdown}
          directions={to_directions}
          setShowDropdown={setShowDropdown}
          onChangeBookingPostData={onChangeBookingPostData}
        />
      )}
    </div>
  )
}