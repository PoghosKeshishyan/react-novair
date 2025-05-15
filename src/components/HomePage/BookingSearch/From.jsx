import { useEffect, useRef, useState } from "react";
import { FromDropdown } from "./FromDropdown";

export function From({ bookingPostData, from_directions, bookingFields, onChangeBookingPostData }) {
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
  };

  return (
    <div className="From flex-between" ref={dropdownRef} onClick={() => setShowDropdown(true)}>
      <div className="left-side">
        <p className="title">{bookingFields.from_field_text}</p>

        <div className="info flex-center">
          <img src="/images/plane-flight.svg" alt="plane" />
          <span>{bookingPostData.from_here || bookingFields.select_field_text}</span>
        </div>
      </div>

      <div className="right-side">{bookingPostData.flight_airport_short_name}</div>

      {showDropdown && (
        <FromDropdown
          showDropdown={showDropdown}
          directions={from_directions}
          setShowDropdown={setShowDropdown}
          onChangeBookingPostData={onChangeBookingPostData}
        />
      )}
    </div>
  );
}
