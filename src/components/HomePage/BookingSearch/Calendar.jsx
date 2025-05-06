import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Calendar({ bookingData, setBookingData }) {
  const today = new Date();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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

  const handleChange = (dates) => {
    const [start, end] = dates;
    
    setStartDate(start instanceof Date ? start : null);
    setEndDate(end instanceof Date ? end : null);

    const updatedDates = {
      departure_date: start.toLocaleDateString().split('.').reverse().join('-'),
      return_date: end ? end.toLocaleDateString().split('.').reverse().join('-') : null,
    };

    setBookingData({ ...bookingData, ...updatedDates });
  };

  return (
    <div className="Calendar" ref={dropdownRef} onClick={() => setShowDropdown(true)}>
      <p className="title">Date</p>

      <div className="info flex-center">
        <img src="/images/calendar.svg" alt="calendar" />
        <span>
          {startDate ? startDate.toLocaleDateString() : "Start date"}
          -
          {endDate ? endDate.toLocaleDateString() : "One way"}
        </span>
      </div>

      {showDropdown && <div className="CalendarDropdown">
        <div className="calendar-header">
          <div className="left side">
            <p className="text">Departure date</p>
            <p className="date">{startDate ? startDate.toLocaleDateString() : "Select start date"}</p>
          </div>

          <div className="right side">
            <p className="text">{endDate && "Return date"}</p>
            <p className="date">{endDate ? endDate.toLocaleDateString() : <span>One way ticket</span>}</p>
          </div>
        </div>

        <DatePicker
          selected={startDate}
          onChange={handleChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          minDate={today}
        />
      </div>}
    </div>
  )
}