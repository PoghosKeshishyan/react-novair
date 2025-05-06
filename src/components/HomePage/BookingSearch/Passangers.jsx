import { useEffect, useRef, useState } from "react";
import { PassangersDropdown } from "./PassangersDropdown";

export function Passangers({ bookingData, setBookingData }) {
  const [passangersCount, setPassangersCount] = useState([
    { id: 0, name: "adult_count", count: bookingData.adult_count || 1 },
    { id: 1, name: "child_count", count: bookingData.child_count || 0 },
    { id: 2, name: "baby_count", count: bookingData.baby_count || 0 },
  ]);

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

  const updateBookingData = (key, count) => {
    setBookingData((prev) => ({
      ...prev,
      [key]: count,
    }));
  };

  const handlerPlusBtn = (id) => {
    const newPassangersCount = [...passangersCount];
    const index = newPassangersCount.findIndex((item) => item.id === id);
    newPassangersCount[index].count++;
    setPassangersCount(newPassangersCount);

    updateBookingData(newPassangersCount[index].name, newPassangersCount[index].count);
  };

  const handlerMinusBtn = (id) => {
    const newPassangersCount = [...passangersCount];
    const index = newPassangersCount.findIndex((item) => item.id === id);

    if (index === 0 && newPassangersCount[index].count === 1) {
      return;
    }

    if (newPassangersCount[index].count > 0) {
      newPassangersCount[index].count--;
      setPassangersCount(newPassangersCount);

      updateBookingData(newPassangersCount[index].name, newPassangersCount[index].count);
    }
  };

  const countPassanger = () => {
    let count = 0;
    passangersCount.forEach((item) => {
      count += item.count;
    });
    return count;
  };

  return (
    <div
      className="Passangers"
      ref={dropdownRef}
      onClick={() => setShowDropdown(true)}
    >
      <p className="title">Passangers</p>
      <div className="info">
        <span>{countPassanger()} passenger</span>
      </div>

      {showDropdown && (
        <PassangersDropdown
          showDropdown={showDropdown}
          passangersCount={passangersCount}
          handlerPlusBtn={handlerPlusBtn}
          handlerMinusBtn={handlerMinusBtn}
          setShowDropdown={setShowDropdown}
        />
      )}
    </div>
  );
}