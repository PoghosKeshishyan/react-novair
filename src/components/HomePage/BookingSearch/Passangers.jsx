import { useEffect, useRef, useState } from "react";
import PassangersDropdown from "./PassangersDropdown";

export default function Passangers() {
  const [passangersCount, setPassangersCount] = useState([
    { id: 0, name: "Adult", count: 1 },
    { id: 1, name: "Children", count: 0 },
    { id: 2, name: "Baby", count: 0 },
  ]);

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

  const handlerPlusBtn = (id) => {
    const newPassangersCount = [...passangersCount];
    const index = newPassangersCount.findIndex((item) => item.id === id);
    newPassangersCount[index].count++;
    setPassangersCount(newPassangersCount);
  };

  const handlerMinusBtn = (id) => {
    const newPassangersCount = [...passangersCount];
    const index = newPassangersCount.findIndex((item) => item.id === id);

    if (index === 0 && newPassangersCount[index].count === 1) {
      return;
    }

    if (newPassangersCount[index].count > 0) {
      newPassangersCount[index].count--;
    }

    setPassangersCount(newPassangersCount);
  };

  const countPassanger = () => {
    let count = 0;
    
    passangersCount.forEach((item) => {
      count += item.count;
    });

    return count;
  }

  const submitBookingSearch = () => {
    console.log(passangersCount);
  }

  return (
    <div className="Passangers" ref={dropdownRef} onClick={() => setShowDropdown(true)}>
      <p className="title">Passangers</p>

      <div className="info">
        <span>{countPassanger()} passenger</span>
      </div>

      {showDropdown && <PassangersDropdown
        showDropdown={showDropdown}
        passangersCount={passangersCount}
        handlerPlusBtn={handlerPlusBtn}
        handlerMinusBtn={handlerMinusBtn}
        setShowDropdown={setShowDropdown}
      />}
    </div>
  )
}
