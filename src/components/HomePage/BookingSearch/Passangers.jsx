import { useEffect, useRef, useState } from "react";
import { PassangersDropdown } from "./PassangersDropdown";

export function Passangers({ bookingFields, bookingPostData, onChangeBookingPostData }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutSide);

    return () => {
      window.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  const handleClickOutSide = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  const handlerPlusBtn = (key) => {
    onChangeBookingPostData({
      ...bookingPostData, [key]: bookingPostData[key] + 1,
    });
  };

  const handlerMinusBtn = (key) => {
    onChangeBookingPostData({
      ...bookingPostData, [key]: bookingPostData[key] - 1,
    });
  };

  const calculatePassangersCount = () => {
    return bookingPostData.adult_count + bookingPostData.child_count + bookingPostData.baby_count;
  };

  return (
    <div
      className="Passangers"
      ref={dropdownRef}
      onClick={() => setShowDropdown(true)}
    >
      <p className="title">{bookingFields.passangers_field_text}</p>

      <div className="info">
        <span>{calculatePassangersCount()} {bookingFields.passangers_field_text_2}</span>
      </div>

      {showDropdown && (
        <PassangersDropdown
          showDropdown={showDropdown}
          passangers_field_list={bookingFields.passangers_field_list[0]}
          bookingPostData={bookingPostData}
          handlerPlusBtn={handlerPlusBtn}
          handlerMinusBtn={handlerMinusBtn}
          setShowDropdown={setShowDropdown}
        />
      )}
    </div>
  );
}